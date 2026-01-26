import { useQuery } from "@tanstack/react-query";

interface PubDevPackageData {
  name: string;
  version: string;
  points: number;
  likes: number;
  totalDownloads: number | null;
  downloadData: Array<{
    date: string;
    downloads: number;
    fullDate: Date;
  }> | null;
}

interface PubDevApiResponse {
  name: string;
  latest: {
    version: string;
  };
  score?: {
    grantedPoints?: number;
    likeCount?: number;
    popularityScore?: number;
  };
  downloads?: number;
}

interface PubDevMetricsResponse {
  score?: {
    downloadCount30Days?: number;
    downloadCount90Days?: number;
    downloadCount?: number;
    grantedPoints?: number;
    likeCount?: number;
  };
  scorecard?: {
    overallScore?: number;
    weeklyVersionDownloads?: {
      totalWeeklyDownloads?: number[];
      newestDate?: string;
    };
  };
}

const fetchWithProxy = async (url: string): Promise<Response> => {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (response.ok) {
      return response;
    }
  } catch (error: any) {
    if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
      console.warn(`CORS error for ${url}, using CORS proxy...`);
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      try {
        const proxyResponse = await fetch(proxyUrl);
        if (proxyResponse.ok) {
          return proxyResponse;
        }
        throw new Error(`Proxy fetch failed: ${proxyResponse.status}`);
      } catch (proxyError) {
        console.error(`CORS proxy also failed for ${url}:`, proxyError);
        throw error;
      }
    }
    throw error;
  }
  throw new Error('Failed to fetch');
};

const fetchPackageData = async (packageName: string): Promise<PubDevPackageData> => {
  const response = await fetchWithProxy(`https://pub.dev/api/packages/${packageName}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch package data for ${packageName}: ${response.status} ${response.statusText}`);
  }
  
  const data: PubDevApiResponse = await response.json();
  
  let metricsData: PubDevMetricsResponse | null = null;
  let downloadCount30Days = 0;
  let weeklyDownloads: number[] = [];
  
  try {
    const metricsResponse = await fetchWithProxy(`https://pub.dev/api/packages/${packageName}/metrics`);
    if (metricsResponse.ok) {
      metricsData = await metricsResponse.json();
      downloadCount30Days = metricsData.score?.downloadCount30Days || 0;
      weeklyDownloads = metricsData.scorecard?.weeklyVersionDownloads?.totalWeeklyDownloads || [];
    } else {
      console.warn(`Metrics response not OK for ${packageName}:`, metricsResponse.status);
    }
  } catch (error) {
    console.warn(`Failed to fetch metrics for ${packageName}:`, error);
  }
  
  let totalDownloads = 0;
  if (weeklyDownloads.length > 0) {
    totalDownloads = weeklyDownloads.reduce((sum, week) => sum + (week || 0), 0);
  } else if (downloadCount30Days > 0) {
    totalDownloads = downloadCount30Days;
  } else {
    totalDownloads = data.downloads || 0;
  }
  
  let downloadData: PubDevPackageData['downloadData'] = null;
  
  if (weeklyDownloads.length > 0) {
    const newestDateStr = metricsData?.scorecard?.weeklyVersionDownloads?.newestDate;
    const newestDate = newestDateStr 
      ? new Date(newestDateStr)
      : new Date();
    
    const weeks = weeklyDownloads.length;
    downloadData = [];
    
    for (let i = 0; i < weeks; i++) {
      const date = new Date(newestDate);
      date.setDate(date.getDate() - (i * 7));
      
      downloadData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        downloads: weeklyDownloads[i] || 0,
        fullDate: date,
      });
    }
    
    downloadData.reverse();
  } else {
    const weeks = 12;
    const today = new Date();
    downloadData = [];
    
    for (let i = weeks - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - (i * 7));
      
      downloadData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        downloads: 0,
        fullDate: date,
      });
    }
  }
  
  const points = metricsData?.score?.grantedPoints || 
                 data.score?.grantedPoints || 
                 data.score?.popularityScore || 
                 0;
  
  const likes = metricsData?.score?.likeCount || 
                data.score?.likeCount || 
                0;
  
  return {
    name: data.name,
    version: data.latest.version,
    points,
    likes,
    totalDownloads: totalDownloads > 0 ? totalDownloads : null,
    downloadData,
  };
};

export const usePubDevPackage = (packageName: string) => {
  return useQuery({
    queryKey: ["pubDevPackage", packageName],
    queryFn: () => fetchPackageData(packageName),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

