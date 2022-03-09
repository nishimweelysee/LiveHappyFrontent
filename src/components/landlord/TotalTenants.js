import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Box, Card, CardContent, Grid, Typography} from "@material-ui/core";
import {CheckCircle, Clear, EventAvailable, PeopleAltOutlined} from "@material-ui/icons";
import {GridArrowUpwardIcon} from "@material-ui/data-grid";
import {UserContext} from "../../context/UserContext";

function TotalTenants(props) {
    const {livedHouses} = useContext(UserContext);
    const [all,setAll]=useState(0);
    const [active,setActive]= useState(0);
    const [inactive,setInactive] = useState(0);
    useEffect(()=>{
        livedHouses.map((l)=>{
            console.log(l)
            if(l.lstatus==='Now'){
                setActive(active+1)
            }else{
                setInactive(inactive+1)
            }
        })
    },[livedHouses])

    return (
        <div>
            <Card {...props}>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Grid item>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                TOTAL TENANTS
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                {livedHouses.length>=1000?(livedHouses.length/1000)+'k':livedHouses.length}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar
                                sx={{
                                    backgroundColor: 'success',
                                    height: 56,
                                    width: 56
                                }}
                            >
                                <PeopleAltOutlined />
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            pt: 2
                        }}
                    >
                        <CheckCircle color="primary" />
                        <Typography
                            variant="body2"
                            sx={{
                                mr: 1
                            }}
                        >
                            {active} Active
                        </Typography>
                        <Clear color="error" />
                        <Typography
                            variant="body2"
                            sx={{
                                mr: 1
                            }}
                        >
                            {inactive} Prev
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default TotalTenants;
