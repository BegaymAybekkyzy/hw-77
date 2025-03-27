import MessageForm from "./components/MessageForm/MessageForm.tsx";
import {Box} from "@mui/material";
import Layout from "./components/Layout/Layout.tsx";
import {IMessage} from "./types";

const App = () => {

    const onCreateNewProduct = async (message: IMessage) => {
        try {
            console.log(message)
        } catch (e) {
            console.error(e);
        }
    };
  return (
    <Layout>

        <Box sx={{
            position: "sticky", bottom: 0, width: "110%", background: "white", zIndex: 1000
        }}>
            <hr/>
            <Box sx={{width: "70%", ml: "auto", mr: "auto"}}>
                <MessageForm onSubmitProduct={onCreateNewProduct}/>
            </Box>
        </Box>
    </Layout>
  )
};

export default App
