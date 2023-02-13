
// styles
import { Box, CircularProgress, LinearProgress, Stack } from "@mui/material";
import L from "../styles/components/loader.module.css";



const Loader = () => {


  return (
    <div className={L.center}>
      <div className={L.wave}></div>
      <div className={L.wave}></div>
      <div className={L.wave}></div>
      <div className={L.wave}></div>
      <div className={L.wave}></div>
      <div className={L.wave}></div>
      <div className={L.wave}></div>
      <div className={L.wave}></div>
      <div className={L.wave}></div>
      <div className={L.wave}></div>
    </div>
  )

}

export default Loader


export const  Loader2 = () => {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="primary" />
    </Stack>
  )
}


export const  Loader3 = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}
