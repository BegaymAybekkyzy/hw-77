import React from 'react';
import {Card, CardMedia, CardContent, Typography, Grid} from "@mui/material";
import {apiUrl} from "../../globalConstants.ts";

interface Props {
    message: string;
    author?: string;
    image?: string | undefined;
}

const MessagesCard: React.FC<Props> = ({message, image = "", author="Anonymous"}) => {
    let imagePath = "";

    if (image) {
        imagePath = apiUrl + "images" + '/' + image;
    }

    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card sx={{ maxWidth: 365 }}>
                <CardMedia
                    component="img"
                    sx={{ height: 240, objectFit: "cover" }}
                    image={imagePath}
                    title={image ? image : "no image"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {author}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {message}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>

    );
};

export default MessagesCard;