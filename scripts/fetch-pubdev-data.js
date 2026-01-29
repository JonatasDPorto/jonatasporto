#!/usr/bin/env node

/**
 * Script para buscar dados do pub.dev e gerar JSON estático
 * Roda via GitHub Actions diariamente
 */

import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PACKAGES = [
  'flux_borders',
  'clean_dart_generate',
  'image_slider_button',
];

const fetchWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      if (response.status === 429) {
        // Rate limit - espera antes de tentar novamente
        const waitTime = Math.pow(2, i) * 1000; // Exponential backoff
        console.log(`Rate limited, waiting ${waitTime}ms before retry ${i + 1}/${retries}`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      const waitTime = Math.pow(2, i) * 1000;
      console.log(`Error fetching ${url}, retrying in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
};

const fetchPackageData = async (packageName) => {
  console.log(`Fetching data for ${packageName}...`);
  
  try {
    // Busca dados do pacote
    const packageUrl = `https://pub.dev/api/packages/${packageName}`;
    const packageData = await fetchWithRetry(packageUrl);
    
    // Busca métricas do pacote
    let metricsData = null;
    try {
      const metricsUrl = `https://pub.dev/api/packages/${packageName}/metrics`;
      metricsData = await fetchWithRetry(metricsUrl);
    } catch (error) {
      console.warn(`Failed to fetch metrics for ${packageName}:`, error.message);
    }
    
    // Processa os dados
    const downloadCount30Days = metricsData?.score?.downloadCount30Days || 0;
    const weeklyDownloads = metricsData?.scorecard?.weeklyVersionDownloads?.totalWeeklyDownloads || [];
    
    let totalDownloads = 0;
    if (weeklyDownloads.length > 0) {
      totalDownloads = weeklyDownloads.reduce((sum, week) => sum + (week || 0), 0);
    } else if (downloadCount30Days > 0) {
      totalDownloads = downloadCount30Days;
    } else {
      totalDownloads = packageData.downloads || 0;
    }
    
    // Processa dados de download por semana
    let downloadData = null;
    if (weeklyDownloads.length > 0) {
      const newestDateStr = metricsData?.scorecard?.weeklyVersionDownloads?.newestDate;
      const newestDate = newestDateStr ? new Date(newestDateStr) : new Date();
      
      const weeks = weeklyDownloads.length;
      downloadData = [];
      
      for (let i = 0; i < weeks; i++) {
        const date = new Date(newestDate);
        date.setDate(date.getDate() - (i * 7));
        
        downloadData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          downloads: weeklyDownloads[i] || 0,
          fullDate: date.toISOString(),
        });
      }
      
      downloadData.reverse();
    }
    
    const points = metricsData?.score?.grantedPoints || 
                   packageData.score?.grantedPoints || 
                   packageData.score?.popularityScore || 
                   0;
    
    const likes = metricsData?.score?.likeCount || 
                  packageData.score?.likeCount || 
                  0;
    
    return {
      name: packageData.name,
      version: packageData.latest.version,
      points,
      likes,
      totalDownloads: totalDownloads > 0 ? totalDownloads : null,
      downloadData,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching ${packageName}:`, error.message);
    throw error;
  }
};

const main = async () => {
  console.log('Starting pub.dev data fetch...');
  console.log(`Packages to fetch: ${PACKAGES.join(', ')}`);
  
  const results = {};
  const errors = {};
  
  // Busca dados de cada pacote
  for (const packageName of PACKAGES) {
    try {
      const data = await fetchPackageData(packageName);
      results[packageName] = data;
      console.log(`✓ Successfully fetched ${packageName}`);
      
      // Pequeno delay entre requisições para evitar rate limit
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Failed to fetch ${packageName}:`, error.message);
      errors[packageName] = error.message;
    }
  }
  
  // Cria estrutura de dados final
  const output = {
    lastUpdated: new Date().toISOString(),
    packages: results,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
  
  // Garante que a pasta existe
  const outputDir = join(__dirname, '..', 'public', 'data');
  mkdirSync(outputDir, { recursive: true });
  
  // Salva o JSON
  const outputPath = join(outputDir, 'pubdev-packages.json');
  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  
  console.log('\n=== Summary ===');
  console.log(`Successfully fetched: ${Object.keys(results).length}/${PACKAGES.length} packages`);
  if (Object.keys(errors).length > 0) {
    console.log(`Errors: ${Object.keys(errors).length}`);
    console.log('Errors:', errors);
  }
  console.log(`Output saved to: ${outputPath}`);
  console.log(`Last updated: ${output.lastUpdated}`);
};

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

