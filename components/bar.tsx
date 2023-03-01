// navbar component

// styles
import navStyles from "../styles/components/bar.module.css";

// next components
import Link from "next/link";

// mui icons
import DeleteIcon from '@mui/icons-material/Delete';

const Bar = ({text,type,callBack,backgroundColor,textColor,deleteIcon}) => {


  return (
  <div className = {navStyles.navbar} style={{backgroundColor:backgroundColor,color:textColor}} >
    <div>
      {type}
    </div>
    <div>-</div>
    <div>
      {text}
    </div>
    {deleteIcon && <DeleteIcon onClick={callBack} sx={{marginLeft:"10%",cursor:"pointer"}} color="primary" />}
  </div>)

}

export default Bar