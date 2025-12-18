interface VideoPlayerProps {
  videoUrl: string;
}

const getEmbedUrl = (url: string) => {
  if (url.includes("/embed/")) return url;
  const videoId = url.split("v=")[1]?.split("&")[0];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  return (
    
    <div className="w-full bg-black rounded-2xl overflow-hidden shadow-2xl relative aspect-video animate-in fade-in zoom-in duration-300 border border-gray-800">
      <iframe
        src={getEmbedUrl(videoUrl)}
        title="Lecture Video"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;