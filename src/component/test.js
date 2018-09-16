/**
 * Created by chenqilong on 2018/9/16.
 */
import React from 'react';

class Test extends React.Component {
    state = {
        click:()=>{
            console.log("click")
        }
    }

    render() {
       return <div>Test</div>
    }
}


export default  Test;