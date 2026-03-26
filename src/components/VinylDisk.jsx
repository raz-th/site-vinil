import "./VinylDisk.css";

const VinylDisk = ({ className = "", spin = false, style, color = '#47989d' }) => (
  <div
    className={`vinyl ${spin ? "spinning" : ""} ${className}`}
    style={style}
  >
    <div className="vinyl__reflection" />
    <div className="vinyl__label" style={{background: color}}>
      <div className="vinyl__hole" />
    </div>
  </div>
);

export default VinylDisk;