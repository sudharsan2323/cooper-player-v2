import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import SignIn from "./components/SignIn";
import SignUp from './components/SignUp'
import PlayListForm from "./components/PlayListForm";
import SignOut from "./components/SignOut";
import ViewPlaylist from "./components/ViewPlaylist";
import PlaylistAddSong from './components/PlaylistAddsong'
import PlaylistViewSong from "./components/PlaylistViewSong";
import Upgrade from "./components/Upgrade";
import DisplaySong from "./components/DisplaySong";
import AddSong from "./components/AddSong";
import DeleteSong from "./components/DeleteSong";
import AddPlan from "./components/AddPlan";
import DeletePlan from "./components/DeletePlan";
import Users from "./components/Users";
import AdminListSongs from "./components/AdminListSongs";
import PlaylistDelete from "./components/PlaylistDelete";
import PlaylistDeleteSong from "./components/PlaylistDeleteSong";
import AdminQueries from "./components/AdminQueries"
import axios from "axios";
import Queries from "./components/Queries";
import AdvertismentModal from "./components/shared/AdvertismentModal";

function App() {
    useEffect(() => {
        if(!localStorage.getItem("user")){
            return (
                <Redirect to="/"/>
            )        
        }
        axios.get(`http://localhost:8080/user/${localStorage.getItem("user")}`)
        .then((res) => {
            localStorage.setItem("status", res.data.user.status)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <React.Fragment>
            <div className="bg-black">
                <AdvertismentModal/>
                <Router>
                    <div className="container">
                    
                        <Switch>
                            <Route exact path="/signup" component={SignUp} />
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/signout" component={SignOut} />
                            <Route exact path="/admin/addsong" component={AddSong} />
                            <Route exact path="/admin/deletesong" component={DeleteSong} />
                            <Route exact path="/admin/addplan/:userId" component={AddPlan} />
                            <Route exact path="/admin/deleteplan/:userId" component={DeletePlan} />
                            <Route exact path="/admin/queries" component={AdminQueries} />
                            <Route exact path="/admin/users" component={Users} />
                            <Route exact path="/admin/songs" component={AdminListSongs} />
                            <Route exact path="/user/queries" component={Queries} />
                            <Route exact path="/" component={DisplaySong} />
                            <Route exact path="/playlist/deleteplaylist" component={PlaylistDelete} />
                            <Route exact path="/playlist/playlistform" component={PlayListForm} />
                            <Route exact path="/playlist/viewplaylist" component={ViewPlaylist} />
                            <Route exact path="/playlist/addsong" component={PlaylistAddSong} />
                            <Route exact path="/playlist/viewsong" component={PlaylistViewSong} />
                            <Route exact path="/playlist/deletesong" component={PlaylistDeleteSong} />
                            <Route exact path="/user/upgrade" component={Upgrade} />
                            <Redirect to="/"/>
                        </Switch>
                    </div>

                </Router>
            </div>
        </React.Fragment>
    );
}

export default App;
