// navbar component

// styles
import navStyles from "../styles/components/bar.module.css";

// next components
import Link from "next/link";

const Bar = ({text,type}) => {


  return (
  <div className = {navStyles.navbar}>
    <div>
      {type}
    </div>
    <div>-</div>
    <div>
      {text}
    </div>
  </div>)

}

export default Bar