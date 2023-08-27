const myChart = document.querySelector(".my-chart");
const searchBar1 = document.querySelector(".search-bar1");
const searchBar2 = document.querySelector(".search-bar2");
const searchBar3 = document.querySelector(".search-bar3");
const btn = document.querySelector(".calculate");
const number1 = document.querySelector(".number1");
const number2 = document.querySelector(".number2");
const number3 = document.querySelector(".number3");

//Object for Chart
const chartData = {
  labels: ["Invested Amount", "Est. returns"],
  data: [600000, 561695],
};

//Creating new Chart
const mychart = new Chart(myChart, {
  type: "doughnut",
  data: {
    labels: chartData.labels,
    datasets: [
      {
        // label: chartData.labels,
        data: chartData.data,
      },
    ],
  },
  options: {
    borderWidth: 1,
    borderRadius: 1,
  },
});

const calculate = function () {
  const principal = searchBar1.value; //monthly investment
  const rate = searchBar2.value / 1200; //monthly rate of interst
  const time = searchBar3.value * 12; // time in months
  const investedAmt = principal * time; //total invested amount

  if (!principal || !rate || !time) return;

  const totalAmt = Math.trunc(
    principal * (((rate + 1) ** time - 1) / rate) * (rate + 1)
  );

  const returns = totalAmt - investedAmt; //returns

  //updating the datas in chartData
  chartData.data[0] = investedAmt;
  chartData.data[1] = returns;

  //update the chart
  mychart.update();

  //displaying the new amounts
  number1.textContent = `₹${investedAmt.toLocaleString("en-IN")}`;
  number2.textContent = `₹${returns.toLocaleString("en-IN")}`;
  number3.textContent = `₹${totalAmt.toLocaleString("en-IN")}`;
};

btn.addEventListener("click", calculate);
