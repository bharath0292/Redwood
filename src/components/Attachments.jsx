import * as React from 'react';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import '../ui/Pop.css'


function FileUpload(props) {
    let uploadObj


    var dropContainerEle = null;
    var dropContainerRef = element => {
        dropContainerEle = element;
    };

    const asyncSettings = {
        saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
    };

    const rendereComplete = () => {
        uploadObj.dropArea = dropContainerEle;
        uploadObj.element.setAttribute('name', 'UploadFiles');
        uploadObj.dataBind();
    }
    const onChange = (args) => {
        uploadObj.autoUpload = args.checked;
        uploadObj.clearAll();
    }
    const onChanged = (args) => {
        uploadObj.sequentialUpload = args.checked;
        uploadObj.clearAll();
    }
    const onRemoveFile = (args) => {
        args.postRawFile = false;
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>close</button>
                <div className='control-pane' ref={dropContainerRef} >
                    <div className='control-section row uploadpreview'>
                        <div className='col-lg-9'>
                            <div className='upload_wrapper'>
                                <UploaderComponent id='fileUpload' type='file' ref={(scope) => { uploadObj = scope; }} asyncSettings={asyncSettings} removing={onRemoveFile.bind(this)}></UploaderComponent>
                            </div>
                        </div>
                        <div className='property-section col-lg-3' id="uploader">
                        </div>
                    </div>
                </div >
            </div>
        </div>
    ) : "";
}

export default FileUpload