/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import React from "react";
import CanvasArtBoard from "../graph/canvas-artboard";
import defaultOptions from "../graph/networkOptions";
import {GraphCanvasCtrl} from "../graph/canvas-ctrl";
import GenerateEvents from "../graph/events";
import { json2GraphData, modelGroup2GraphData, GraphData } from "./utils";
// import spaceXLaunchData from "../sample-data/spacex-launch-data.json"
import spaceXMissionsData from "../sample-data/spacex-missions-data.json"
import {nodeGroupModels, edgeGroupModels} from "./models"
import "./example-view.scss"

const groupsModels: any = {nodeGroupModels, edgeGroupModels}

const ExampleView = () => {
    const canvasCtrl: GraphCanvasCtrl = new GraphCanvasCtrl();
    const [renderCanvas, setRenderCanvas] = React.useState<boolean>(false);

    const [view, setView] = React.useState<string>("viewer");

    const events = GenerateEvents(canvasCtrl, () => console.log("ok"), null)


    // const sampleData: GraphData = json2GraphData(spaceXMissionsData, groupsModels.nodeGroupModels, groupsModels.edgeGroupModels);
    const sampleData: GraphData = modelGroup2GraphData(groupsModels.nodeGroupModels, groupsModels.edgeGroupModels);

    const data = {nodes:sampleData.nodes.get(), edges: sampleData.edges.get() }
    canvasCtrl.addNewData(data.nodes,data.edges);


    // function getRndInteger(min: any, max: any) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // function addNewData() {
    //     const rand = getRndInteger(1, 1000);
    //     canvasCtrl.addNewData([{id: "yolo-" + rand, label: "yolo-" + rand}], []);
    // }

    return (
        <div className=" ">
            {/*{loading ? (*/}
            {/*    <Loader backdrop content="Fetching schema model ..." vertical/>*/}
            {/*) : (<span></span>)}*/}
            <ul className="inline-list hr">
                <li className="header-logo">Graph Canvas</li>
                <li className={view === "data" ? 'active' : ''} onClick={()=> setView("data")}>Data</li>
                <li className={view === "model" ? 'active' : ''} onClick={()=> setView("model")}>Model</li>
                <li className={view === "viewer" ? 'active' : ''} onClick={()=> setView("viewer")}>Viewer</li>
            </ul>
            { view === "data"  
                ? <div className="data-view">
                    <textarea>{JSON.stringify(data, null, 2)}</textarea>
                    <button type="submit">Update</button>
                </div>
                : <React.Fragment />
            }
            { view === "model"  
            ? <div className="model-view">
                <div className="col-left">
                    <textarea>{JSON.stringify(groupsModels, null, 2)}</textarea>
                    <button type="submit">Update</button>
                </div>
                <div className="col-right">
                    <CanvasArtBoard
                        containerId={"artboard-2"}
                        renderCanvas={renderCanvas}
                        setRenderCanvas={setRenderCanvas}
                        options={defaultOptions}
                        events={events}
                        canvasCtrl={canvasCtrl}
                        style={{width: "100%", height: "calc(-96px + 100vh)", border: "1px solid rgb(143, 143, 143)"}}
                    />
                </div>
               
            
        </div>
        : <React.Fragment />
            }
            { view === "viewer"  
                ? <CanvasArtBoard
                        containerId={"artboard-1"}
                        renderCanvas={renderCanvas}
                        setRenderCanvas={setRenderCanvas}
                        options={defaultOptions}
                        events={events}
                        canvasCtrl={canvasCtrl}
                        style={{width: "100%", height: "calc(100vh - 40px)"}}
                    />
                : <React.Fragment />
            }

            </div>
    );
};

export default ExampleView;