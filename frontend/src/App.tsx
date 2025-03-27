import MessageForm from "./components/MessageForm/MessageForm.tsx";
import {Box} from "@mui/material";
import Layout from "./components/Layout/Layout.tsx";
import {IMessage} from "./types";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {fetchAllMessages, submitNewMessage} from "./store/Messages/messagesThunks.ts";
import {useEffect} from "react";
import {selectMessages} from "./store/Messages/messagesSlice.ts";

const App = () => {
    const dispatch = useAppDispatch();
    const allMessages = useAppSelector(selectMessages);

    useEffect(() => {
        dispatch(fetchAllMessages());
    }, [dispatch]);

    console.log(allMessages);

    const onCreateNewProduct = async (message: IMessage) => {
        try {
            dispatch(submitNewMessage(message))
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
