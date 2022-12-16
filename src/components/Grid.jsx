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


  let gridInstance;
  let text = '';

  // To autofit columns 
  const dataBound = () => {
    if (gridInstance) {
      gridInstance.autoFitColumns();
      sumAmount()
    }
  }

  const beforeBatchSave = () => {
    if (gridInstance) {
      // sumAmount()
    }
  }

  const sumAmount = () => {
    const sumData = gridInstance.dataSource

    var pos = 0
    var neg = 0

    for (var arr in sumData) {
      var num = Number(sumData[arr].taxbaseamount)
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


  // To read excel
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    for (let i = 0; i < jsonData.length; i++) {
      jsonData[i].id = i
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

  clickHandler = clickHandler.bind(this);

  let beforeBatchAdd = (e) => {
    var val = rowindex + 1
    e.defaultData.id = val
    setRowindex(val)
  }

  beforeBatchAdd = beforeBatchAdd.bind(this)

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
        beforeBatchAdd={beforeBatchAdd}
        beforeBatchSave={beforeBatchSave}
        created={created.bind(this)}
        allowExcelExport={true}
        ref={grid => gridInstance = grid}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="id"
            headerText="ID"
            type="number"
            textAlign="Right"
            width="120"
            isPrimaryKey={true}
            isIdentity={true}
            visible={false}
          />
          <ColumnDirective
            field="companycode"
            headerText="Company Code"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="account"
            headerText="Account"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="amountindoccurrency"
            headerText="Amount in Doc Currency"
            type="string"
            textAlign="Left"
            width="120"
          />
          <ColumnDirective
            field="lc1"
            headerText="LC1"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="costcenter"
            headerText="Cost Center"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="profitcenter"
            headerText="Profit Center"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="transactiontype"
            headerText="Transaction Type"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="itemtext"
            headerText="Item Text"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="tradingpartner"
            headerText="Trading Partner"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="partnerprofitcenter"
            headerText="Partner Profitcenter"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="order"
            headerText="Order"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="wbselement"
            headerText="WBS Element"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="network"
            headerText="Network"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="activityno"
            headerText="Activity No"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="salesorder"
            headerText="Sales Order"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="salesorderitem"
            headerText="Sales Order Item #"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="taxjurisdictioncode"
            headerText="Tax Jurisdiction Code"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="taxtype"
            headerText="Tax Code/Tax Type"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="taxbaseamount"
            headerText="Tax Base Amount"
            type="number"
            textAlign="Right"
          />
          <ColumnDirective
            field="assignment"
            headerText="Assignment"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="functionalarea"
            headerText="Functional Area"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="referencekey1"
            headerText="Reference Key 1"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="referencekey2"
            headerText="Reference Key 2"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="plant"
            headerText="Plant"
            type="string"
            textAlign="Left"
          />
          <ColumnDirective
            field="businessarea"
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
