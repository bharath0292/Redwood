// Node modules
import { useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  ExcelExport,
  GridComponent, Resize
} from "@syncfusion/ej2-react-grids";
import { Edit, Inject, Toolbar } from "@syncfusion/ej2-react-grids";
import { read, utils } from "xlsx";
import $ from "jquery"

import { DataManager, Query } from '@syncfusion/ej2-data';


export function Grids() {
  const toolbarOptions = ['Add', 'Delete', 'Update', 'Cancel',
    { text: 'Upload', tooltipText: 'Upload', prefixIcon: 'e-Upload', id: 'Upload' }, 'ExcelExport'
  ];
  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showConfirmDialog: false,
    newRowPosition: "Bottom",
    mode: "Batch",
  };

  const [data, setData] = useState([]);
  const [rowindex, setRowindex] = useState(0)
  const [positive, setPositive] = useState(0)
  const [negative, setNegative] = useState(0)
  const [total, setTotal] = useState(0)
  const [primarykey, setPrimarykey] = useState(true)


  let gridInstance;
  let text = '';

  // let result = new DataManager(data).executeLocal(new Query().take(8));
  // let items = result.map((row) => (console.log("Bharath")));


  // To autofit columns 
  const dataBound = () => {
    if (gridInstance) {
      gridInstance.autoFitColumns();
      sumAmount()
    }
  }


  const sumAmount = () => {
    // gridInstance.refresh()
    const sumData = gridInstance.dataSource

    var pos = 0
    var neg = 0

    for (var arr in sumData) {
      var num = Number(sumData[arr]["Amount in Doc Currency"])
      if (num > 0) {
        pos += num;
      }
      else if (num < 0) {
        neg += num
      }
    }

    setPositive(pos)
    setNegative(neg)
    setTotal(pos + neg)

  }

  let beforeBatchSave = () => {
    console.log("beforeBatchSave");
    sumAmount()
  }


  // To read excel
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    for (let i = 0; i < jsonData.length; i++) {
      jsonData[i].id = i + 1
    }
    setData(jsonData);
  };

  let clickHandler = (args) => {
    if (gridInstance && args.item.id === 'Upload') {
      const upload = () => {
        $('#file-btn').trigger('click')
      };
      upload()
    }
    else if (gridInstance && args.item.text === 'Excel Export') {
      gridInstance.excelExport();
    }
  }


  let beforeBatchAdd = (e) => {
    // var final = gridInstance.dataSource[gridInstance.dataSource.length - 1].id
    // console.log(final)
    // setRowindex(final)

    // console.log(rowindex)
    // console.log(final)

    var val = rowindex + 1
    e.defaultData.id = val
    setRowindex(val)
  }


  let tsvToJson = (tsvText) => {
    var allTextLines = tsvText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(/\t|,/);
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
      var rdata = allTextLines[i].split(/\t|,/);

      if (rdata.length === headers.length) {
        var row = {};
        for (var j = 0; j < headers.length; j++) {
          row[headers[j]] = rdata[j];
        }
        lines.push(row);
      }
    }

    return lines;
  };

  var pasteClipboard = async () => {
    try {
      text = await navigator.clipboard.readText();
      var jsonData = tsvToJson(text)
      for (let i = 0; i < jsonData.length; i++) {
        jsonData[i].id = i
      }
      setData(jsonData)
    }
    catch (err) {
      console.error('Could not read from clipboard', err);
    }
  };

  const keyPressHandler = (args) => {
    if (args.ctrlKey && args.code === 'KeyV') {
      console.log("ctrlV")
      pasteClipboard()
    }
  }
  const created = () => {
    gridInstance.element.addEventListener('keydown', keyPressHandler.bind(this))
  };

  return (
    <>
      <div className="grid gap-3 md:grid-cols-2 sm:grid-cols-2 max-2xl:grid-cols-1">
        <h2 className="font-Montserrat-test text-lg font-bold mx-4 text-teal-600">
          ITEMS
        </h2>
        <div className="flex justify-between font-Montserrat-test text-sm px-4">
          <p className=" text-gray-400">Credit: <span className="font-Montserrat-test text-base font-bold mx-2 text-teal-600">{positive}</span></p>
          <p className=" text-gray-400">Debit: <span className="font-Montserrat-test text-base font-bold mx-2 text-teal-600">{negative}</span></p>
          <p className=" text-gray-400">Difference: <span className="font-Montserrat-test text-base font-bold mx-2 text-teal-600">{total}</span></p>
        </div>
      </div>

      <input id="file-btn" className='e-flat' type="file" onChange={(e) => handleFile(e)} hidden />
      <GridComponent
        dataSource={data}
        toolbar={toolbarOptions}
        toolbarClick={clickHandler}
        editSettings={editOptions}
        allowResizing={true}
        dataBound={dataBound}
        beforeBatchAdd={beforeBatchAdd.bind(this)}
        beforeBatchSave={beforeBatchSave.bind(this)}
        created={created.bind(this)}
        allowExcelExport={true}
        ref={grid => gridInstance = grid}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="id"
            headerText="id"
            type="number"
            textAlign="Right"
            width="120"
            isPrimaryKey={primarykey}
          // isIdentity={true}
          // visible={false}
          // allowEditing={true}
          />
          <ColumnDirective
            field="Company Code"
            headerText="Company Code"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Account"
            headerText="Account"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Amount in Doc Currency"
            headerText="Amount in Doc Currency"
            type="number"
            textAlign="Left"
            width="120"
          />
          <ColumnDirective
            field="LC1"
            headerText="LC1"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Cost Center"
            headerText="Cost Center"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Profit Center"
            headerText="Profit Center"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Transaction Type"
            headerText="Transaction Type"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Item Text"
            headerText="Item Text"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Trading Partner"
            headerText="Trading Partner"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Partner Profitcenter"
            headerText="Partner Profitcenter"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Order"
            headerText="Order"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="WBS Element"
            headerText="WBS Element"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Network"
            headerText="Network"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Activity No"
            headerText="Activity No"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Sales Order"
            headerText="Sales Order"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Sales Order Item #"
            headerText="Sales Order Item #"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Tax Jurisdiction Code"
            headerText="Tax Jurisdiction Code"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Tax Code/Tax Type"
            headerText="Tax Code/Tax Type"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Tax Base Amount"
            headerText="Tax Base Amount"
            type="number"
            textAlign="Right"
          />
          <ColumnDirective
            field="Assignment"
            headerText="Assignment"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Functional Area"
            headerText="Functional Area"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Reference Key 1"
            headerText="Reference Key 1"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Reference Key 2"
            headerText="Reference Key 2"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Plant"
            headerText="Plant"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="Business Area"
            headerText="Business Area"
            type="string"
            textAlign="Left"
          />
          {/* ------------------- 
          <ColumnDirective
            field="assettransactionType"
            headerText="Asset Transaction Type"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="postingkey"
            headerText="Posting Key"
            type="string"
            textAlign="Left"
            width="120"
          />
          <ColumnDirective
            field="sglindicator"
            headerText="SGL Indicator"
            type="string"
            textAlign="Left"
          />


          <ColumnDirective
            field="lc2"
            headerText="LC2"
            type="string"
            textAlign="Left"
          />

          <ColumnDirective
            field="materialno"
            headerText="Material No"
            type="string"
            textAlign="Left"
          />

          <ColumnDirective
            field="unitofmeasure"
            headerText="Unit of Measure"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="quantity"
            headerText="Quantity"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="valuedate"
            headerText="Value Date"
            type="string"
            textAlign="Left"
          />*/}
        </ColumnsDirective>

        <Inject services={[Edit, Toolbar, Resize, ExcelExport]} />
      </GridComponent>
    </>
  );
}

export default Grids;
