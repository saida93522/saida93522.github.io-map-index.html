// ****TIMLINE******
const timeline = document.querySelector(".container");
const total = document.querySelector(".total");
// creating chart for succeful landings
var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Success", "Failed"],
    datasets: [
      {
        label: [],
        backgroundColor: ["#3a6351", "#810000"],
        borderColor: ["#151515"],
        borderWidth: 3,
      },
    ],
  },
  options: {
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         min: 0,
    //         max: 100,
    //         callback: function (value) {
    //           return value + "%";
    //         },
    //       },
    //       scaleLabel: {
    //         display: true,
    //         labelString: "Percentage",
    //       },
    //     },
    //   ],
    // },
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Success Rate",
      fontSize: "20",
      fontColor: "#fff",
    },
    legend: {
      display: true,
      fullWidth: true,
      align: "center",
      labels: {
        display: true,
        fontColor: "#fff",
      },
    },
  },
});

chart.canvas.parentNode.style.margin = "0 auto";
// Past Launches
past_launch();
async function past_launch() {
  // returns promises in Asynchronous and allow other functions to run properly before the promises are returned.
  try {
    const res = await fetch("https://api.spacexdata.com/v4/launches/past");
    const dataJson = await res.json();

    let complete = []; //stores succefful landing (true)
    let failed = []; //stores succefful landing (false)
    let count = 0;
    dataJson.forEach((el) => {
      let succ = el.success;
      if (succ) {
        // console.log(`${el.name} landed successfully`);
        complete.push(succ);
      } else {
        // console.log(`${el.name} landed UNsuccessfully`);
        failed.push(succ);
      }
      count++;
    });
    total.innerHTML = `Total Mission: ${count}`;
    chart.data.datasets[0].data.push(complete.length); //push num of of succeful to chart
    chart.data.datasets[0].data.push(failed.length); //push num of of failed to chart
    chart.data.datasets[0].label.push(count); //counter for total launches
    chart.update(); //updateChart
  } catch (err) {
    console.log(err);
  }
}

// Upcoming Launches
upComing();
async function upComing() {
  try {
    const res = await fetch("https://api.spacexdata.com/v4/launches/upcoming");
    const data = await res.json();
    data.forEach((el) => {
      if (el.upcoming) {
        console.log(el.name);
        let date = new Date(el.date_local);

        // DOM

        let row = document.createElement("div");
        row.classList.add("row");
        // timeline.appendChild(row);

        let col = document.createElement("div");
        col.classList.add("col");
        row.appendChild(col);

        let p1 = document.createElement("p");
        p1.classList.add("upcoming-mission-name");
        p1.innerHTML = el.name;
        col.appendChild(p1);

        let p2 = document.createElement("p");
        p2.classList.add("upcoming-mission-date");
        p2.innerHTML = date;
        col.appendChild(p2);
        let iconDiv = document.createElement("div");
        iconDiv.classList.add("iconDiv");
        col.appendChild(iconDiv);
        let icon1 = document.createElement("i");
        icon1.classList.add("fa");
        icon1.classList.add("fa-space-shuttle");
        icon1.classList.add("fa-rotate-90");

        iconDiv.appendChild(icon1);

        timeline.appendChild(row);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
