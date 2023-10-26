import React from "react";
import "./styles.css"
import { Line } from "@ant-design/charts";
import { Pie } from "@ant-design/charts";

function ChartsComponent({sortedTransactions}){

    const data = sortedTransactions.map((item)=>{
        return{
            date:item.date,
            amount:item.amount,
        }
    });
    

    const spendingData=sortedTransactions.filter(
        (transaction)=>{if(transaction.type=="expense"){
        return{tag:transaction.tag, amount:transaction.amount}
    }}
    );

    let finalSpendings=spendingData.reduce((acc,obj)=>{
        let key=obj.tag;
        if(!acc[key]){
            acc[key]={
                tag:obj.tag,
                amount:obj.amount
            }
        }else{
            acc[key].amount+=obj.amount;
        }
        return acc;
    },{});

    let newSpendings=[{tag:"food",amount:0},{tag:"education",amount:0},{tag:"office",amount:0}];

    spendingData.forEach((item)=>{
    if(item.tag=="food"){
        newSpendings[0].amount+=item.amount; 
    }else if(item.tag=="education"){
        newSpendings[1].amount+=item.amount; 
    }else{
        newSpendings[2].amount+=item.amount; 
    }
    })
      const config = {
        data:data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
        point: {
          size: 5,
          shape: 'diamond',
        },
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };

      const spendingConfig = {
        data: newSpendings,
        width: 450,
        angleField:"amount",
        colorField:"tag",
      };

      let chart;
      let pieChart;
    return(
        <div className="chart-wrapper">
            <div>
                <h1>Your Analytics</h1>
            <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
                </div> 
                <div>
                <h1>Your Spendings</h1>
         <Pie
         {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)}
         />
                </div> 
        </div>
    )
};

export default ChartsComponent;