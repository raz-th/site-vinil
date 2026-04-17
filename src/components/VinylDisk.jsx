import "./VinylDisk.css";

const VinylDisk = ({ className = "", spin = false, style, img = "", color = '#47989d', hideHole=false }) => (
  <div
    className={`vinyl ${spin ? "spinning" : ""} ${className}`}
    style={style}
  >
    <div className="vinyl__reflection" />
    <div className="vinyl__label" style={{backgroundColor: color, backgroundImage: `url("${img}")`, backgroundSize: "cover"}}>
      {!hideHole && (<div className="vinyl__hole" />)}
    </div>
  </div>
);

export default VinylDisk;