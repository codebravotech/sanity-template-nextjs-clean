const videoPreviewImage = ({posterUrl, title, filename}: {posterUrl: string, title: string, filename: string}) => {
  return <img src={posterUrl} alt={title || filename || 'Video poster'} />
    
}

export default videoPreviewImage