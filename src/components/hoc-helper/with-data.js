import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorBoundary from '../error-boundary';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
    return class extends Component {

        state = {
            data: [],
            loading: false,
            error: false
        };
    
        componentDidMount() {
            this.update()
        };  

        componentDidUpdate(prevProps) {
            if(this.props.getData !== prevProps.getData) {
                this.update();
            }
        }

        update() {
            this.setState({
                loading: true,
                error: false
            })
            this.props.getData()
                .then((data) => {
                    this.setState({
                        loading: false,
                        error: false,
                        data
                    });
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        loading: false
                    })
                });
        }
 
        render() {

            const { loading, data, error } = this.state;
                if (loading) {
                    return <Spinner />
                };

                if (error) {
                    return <ErrorIndicator />
                };

            return (
                <ErrorBoundary>
                    <View {...this.props} data={data}/>
                </ErrorBoundary>
            )
        }
    };
}

export default withData;