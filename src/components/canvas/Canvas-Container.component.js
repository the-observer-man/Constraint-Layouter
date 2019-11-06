import React, { Component } from 'react';
import Canvas from './Canvas.component';
import './Canvas-Container.css'
import Guides from '../guides/Guides.component';
import rectData from '../../data/basic-case'

class CanvasContainer extends Component {

  constructor(){
    super();
    this.state = {
      rects: [...rectData.rects],
      selectionId: null,
      mouseDownRectId: null,
      wrtRectIdsIsSet: false,
      wrtRectIds: []
    };

    setTimeout(() => {
      this.deleteRect('el1');
    }, 1000);
  }
  
  updateState(partialState){
    const newState = {...this.state};
    Object.keys(partialState).forEach(key=>{
      newState[key] = partialState[key];
    })

    this.setState(newState);
  }

  updateRectData(rectIndex, rectDetail){
    const newRectState = [...this.state.rects];

    if(rectDetail.x<0 || rectDetail.y <0){
      console.warn("negatives"); //handle it later
      return;
    }

    newRectState[rectIndex] = rectDetail;
    this.updateState({rects:newRectState});
  }

  setWrtRectIds(newIds){
    this.updateState({wrtRectIds:newIds});
  }

  addRect(){

  }

  deleteRect(rectId){
    const rects =  [...this.state.rects];
    const index = rects.findIndex(rectDetail=>rectId == rectDetail.id)
    if(index>=0){
      rects.splice(index,1);
      this.updateState({rects})
    }
  }
  
  render() { 
    return ( <div 
              className = "cl-canvas-container">
                 <div
                  className="cl-canvas__transform">
                    <Guides 
                      rectData={[...this.state.rects]}
                      wrtRectIds={this.state.wrtRectIds}
                      wrtRectIdsIsSet={this.state.wrtRectIdsIsSet}
                      setWrtRectIds={this.setWrtRectIds.bind(this)}
                      mouseDownRectId={this.state.mouseDownRectId}
                      updateState={this.updateState.bind(this)} 
                       />

                    <Canvas 
                      rectData={[...this.state.rects]}
                      mouseDownRectId={this.state.mouseDownRectId}
                      selectionId={this.state.selectionId}
                      wrtRectIds={this.state.wrtRectIds}
                      updateRectData={this.updateRectData.bind(this)}
                      updateState={this.updateState.bind(this)} 
                       />
                </div>
            </div> );
  }
}
 
export default CanvasContainer;   