import * as React from "react";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import "../ui/Pop.css";

function FileUpload(props) {
  let uploadObj;

  var dropContainerEle = null;
  var dropContainerRef = (element) => {
    dropContainerEle = element;
  };

  const asyncSettings = {
    removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
    saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save'
  };

  const rendereComplete = () => {
    uploadObj.dropArea = dropContainerEle;
    uploadObj.element.setAttribute("name", "UploadFiles");
    uploadObj.dataBind();
  };
  const onChange = (args) => {
    uploadObj.autoUpload = args.checked;
    uploadObj.clearAll();
  };
  const onChanged = (args) => {
    uploadObj.sequentialUpload = args.checked;
    uploadObj.clearAll();
  };
  const onRemoveFile = (args) => {
    args.postRawFile = false;
  };

  return (
    <div className="popup font-Montserrat-test" hidden={props.trigger}>
      <div className="popup-inner" >
        <div className="ml-auto">
          <button
            className="close-btn px-4 py-1 siemens-paterol text-white font-Montserrat-test rounded-sm capitalize mb-2"
            onClick={() => props.setTrigger(true)}
          >
            close
          </button>
        </div>
        <div ref={dropContainerRef}>
          <div className="control-section row uploadpreview">
            <div className="col-lg-9">
              <div className="upload_wrapper h-auto">

                <UploaderComponent
                  id="fileUpload"
                  type="file"
                  ref={(scope) => {
                    uploadObj = scope;
                  }}
                  autoUpload={true}
                  asyncSettings={asyncSettings}
                  removing={onRemoveFile.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUpload;
