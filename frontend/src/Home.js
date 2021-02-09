import React, { Component } from "react";
import Header from "./components/header/header";
import About from "./components/about/about";
import Footer from "./components/footer/footer";

class Home extends React.Component {

    showBackgroudScroll = () => {
        document.body.style.overflow = 'auto';
    }

    render() {

        this.showBackgroudScroll();

        return (
            <div>
                <Header></Header>
                <About></About>
                <Footer></Footer>
            </div>
        );
    }
}

export default Home;