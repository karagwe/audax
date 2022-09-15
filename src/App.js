import { Box, Heading } from "@chakra-ui/react";
import Home from "./pages/Home";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

function App() {
  const {isWeb3Enabled, enableWeb3} = useMoralis()

  useEffect(() => {
    if(!isWeb3Enabled){
      enableWeb3()
    }
  }, [])
  return (
    <Box bgColor="blackAlpha.900" color="white" w="100%" >
      <Home />
    </Box>
  )
}

export default App;
