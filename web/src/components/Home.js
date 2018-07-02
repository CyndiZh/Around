import React from 'react';
import { Tabs, Button, Icon, Spin } from 'antd';
import { API_ROOT, GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY } from '../constants';
import { Gallery} from "./Gallery";
import $ from 'jquery';
const TabPane = Tabs.TabPane;
const operations = <Button type="primary">Create New Post</Button>;

export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        loadingPosts: false,
        error: '',
        posts: [],
    }

    componentDidMount() {
        this.setState({ loadingGeoLocation: true, error: '' });
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS);
        } else {
            /* geolocation IS NOT available */
            this.setState({ loadingGeoLocation: false, error: 'Your browser does not support geolocation!' });
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        // console.log(position);
        this.setState({ loadingGeoLocation: false, error: ''});
        const { latitude, longitude} = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude}));
        this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = () => {
        this.setState({ loadingGeoLocation: false, error: 'Failed to load geo location!'});
    }

    loadNearbyPosts = () => {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        this.setState({ loadingPosts: true, error: '' });
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon${lon}&range=20000`,
            method: 'GET',
            headers: ({
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            }),
        }).then((response) => {
            this.setState({ loadingPosts: false, error: '', posts: response});
            console.log(response);
        }, (response) => {
            this.setState({ loadingPosts: false, error: response.responseText});
        }).catch((error) => {
            console.log(error);
        });
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        } else if (this.state.loadingGeoLocation){
            return <Spin tip="Loading GeoLocation..." />
        } else if (this.state.loadingPosts) {
            return <Spin tip="Loading Nearby Posts..." />
        } else if (this.state.posts && this.state.posts.length > 0) {
            const images = this.state.posts.map((post) => {
                return {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    caption: post.message,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                };
            });  // from this.state.posts
            return <Gallery images={images}/>
        }
        return null
    }

    render() {
        return (
            <Tabs tabBarExtraContent={operations} className = "main-tab">
                <TabPane tab={<span><Icon type="picture" />Nearby Posts </span>} key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab={<span><Icon type="environment" />Map </span>} key="2">Content of tab 2</TabPane>
            </Tabs>
        )
    }
}