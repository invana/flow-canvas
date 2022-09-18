import PropTypes from "prop-types";
import Event, {EVENT_TYPES} from "./events";


export default class StateManager {
    setLayoutSettings_ = null
    setSelectedNodes = null
    setMessageText = null
    setHoveredItem = null
    setShowDisplaySettings = null
    setNodeDisplaySettings = null
    setEdgeDisplaySettings = null
    setShowFindAndFocus = null
    setExportCanvas = null

    layoutSettings = null
    selectedNodes = null
    messageText = null
    hoveredItem = null
    showDisplaySettings = null
    nodeDisplaySettings = null
    edgeDisplaySettings = null
    showFindAndFocus = null
    showExportCanvas= null

    // @ts-ignore
    constructor(setLayoutSettings: PropTypes.func, setSelectedNodes: PropTypes.func,
                // @ts-ignore
                setMessageText: PropTypes.func, setHoveredItem: PropTypes.func, setShowDisplaySettings: PropTypes.func,
                // @ts-ignore
                setNodeDisplaySettings: PropTypes.func, setEdgeDisplaySettings: PropTypes.func, setShowFindAndFocus: PropTypes.func,
                // @ts-ignore
                setExportCanvas: PropTypes.func,
                // @ts-ignore
                layoutSettings: PropTypes.object, selectedNodes: PropTypes.object, messageText: PropTypes.object,
                // @ts-ignore
                hoveredItem: PropTypes.object, showDisplaySettings: PropTypes.object,
                // @ts-ignore
                nodeDisplaySettings: PropTypes.object, edgeDisplaySettings: PropTypes.object,
                // @ts-ignore
                showFindAndFocus: PropTypes.bool, showExportCanvas: PropTypes.bool
    ) {
        this.setLayoutSettings_ = setLayoutSettings
        this.setSelectedNodes = setSelectedNodes
        this.setMessageText = setMessageText
        this.setHoveredItem = setHoveredItem
        this.setShowDisplaySettings = setShowDisplaySettings
        this.setNodeDisplaySettings = setNodeDisplaySettings
        this.setEdgeDisplaySettings = setEdgeDisplaySettings
        this.setShowFindAndFocus = setShowFindAndFocus
        this.setExportCanvas = setExportCanvas


        this.layoutSettings = layoutSettings
        this.selectedNodes = selectedNodes
        this.messageText = messageText
        this.hoveredItem = hoveredItem
        this.showDisplaySettings = showDisplaySettings
        this.nodeDisplaySettings = nodeDisplaySettings
        this.edgeDisplaySettings = edgeDisplaySettings
        this.showFindAndFocus = showFindAndFocus
        this.showExportCanvas = showExportCanvas
    }


    setLayoutSettings(data: any) {
        // @ts-ignore
        console.log("setLayoutSettings", data)
        const event = new Event(EVENT_TYPES.updateLayout, `Updated to ${data.label} layout`, data).commit();
        // @ts-ignore
        this.setMessageText(event.message)
        // @ts-ignore
        this.setLayoutSettings_(data)
    }

    focusOnNode(apis: any, node: any) {
        apis.focusNodeById(node.getID());
        node.toFront();
    }

    // showDisplaySettings() {
    //     // @ts-ignore
    //     this.setShowDisplaySettings(true)
    // }

}