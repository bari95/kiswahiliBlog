


function Audio({ title, src, ...rest }) {
    return (
        
      <audio
        className="overflow-hidden rounded"
        controls="1"
        {...rest}
      >
        <source
          src={src.match(/^http/) ? src : `${src}`}
          type="audio/mp3" // Change the type based on the audio format
        />
        {title && <p>{title}</p>}
      </audio>
    );
  }
  
  export default Audio;
  