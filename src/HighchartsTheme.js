import {lightTheme} from './Style';
export default {
  lang: {
    thousandsSep: ','
  },
  colors: [
    '#61d936',
    '#552ccb',
    '#1163c9',
    '#04A1EE',
    '#08C6E0',
    '#146B9E',
    '#F376C1',
    '#1B2839'
  ],
  chart: {
    backgroundColor: lightTheme ? 'white': '#061a44',
    borderColor: '#000000',
    borderWidth: 0,
    className: 'dark-container',
    plotBackgroundColor: lightTheme ? 'white': '#061a44',
    plotBorderWidth: 0
  },
  title: {
    style: {
      color: '#C0C0C0',
      font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
    }
  },
  subtitle: {
    style: {
      color: '#666666',
      font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
    }
  },
  xAxis: {
    gridLineColor: '#333333',
    gridLineWidth: 0,
    labels: {
      style: {
        color: '#A0A0A0'
      }
    },
    lineColor: '#A0A0A0',
    tickColor: '#A0A0A0',
    title: {
      style: {
        color: '#CCC',
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    gridLineWidth: 0,
    gridLineColor: '#333333',
    labels: {
      style: {
        color: '#A0A0A0'
      }
    },
    lineColor: '#A0A0A0',
    minorTickInterval: null,
    tickColor: '#A0A0A0',
    tickWidth: 1,
    title: {
      style: {
        color: '#CCC',
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
      }
    }
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    style: {
      color: '#F0F0F0'
    }
  },
  toolbar: {
    itemStyle: {
      color: 'silver'
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        color: '#CCC'
      },
      marker: {
        lineColor: '#333'
      }
    },
    spline: {
      marker: {
        lineColor: '#333'
      }
    },
    scatter: {
      marker: {
        lineColor: '#333'
      }
    },
    candlestick: {
      lineColor: 'white'
    }
  },
  legend: {
    itemStyle: {
      font: '9pt Trebuchet MS, Verdana, sans-serif',
      color: '#A0A0A0'
    },
    itemHoverStyle: {
      color: '#FFF'
    },
    itemHiddenStyle: {
      color: '#444'
    }
  },
  credits: {
    style: {
      color: '#666'
    }
  },
  labels: {
    style: {
      color: '#CCC'
    }
  },

  navigation: {
    buttonOptions: {
      symbolStroke: '#DDDDDD',
      hoverSymbolStroke: '#FFFFFF',
      theme: {
        fill: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0.4, '#606060'], [0.6, '#333333']]
        },
        stroke: '#000000'
      }
    }
  },

  // scroll charts
  rangeSelector: {
    buttonTheme: {
      fill: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [[0.4, '#888'], [0.6, '#555']]
      },
      stroke: '#000000',
      style: {
        color: '#CCC',
        fontWeight: 'bold'
      },
      states: {
        hover: {
          fill: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [[0.4, '#BBB'], [0.6, '#888']]
          },
          stroke: '#000000',
          style: {
            color: 'white'
          }
        },
        select: {
          fill: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [[0.1, '#000'], [0.3, '#333']]
          },
          stroke: '#000000',
          style: {
            color: 'yellow'
          }
        }
      }
    },
    inputStyle: {
      backgroundColor: '#333',
      color: 'silver'
    },
    labelStyle: {
      color: 'silver'
    }
  },

  navigator: {
    handles: {
      backgroundColor: '#666',
      borderColor: '#AAA'
    },
    outlineColor: '#CCC',
    maskFill: 'rgba(16, 16, 16, 0.5)',
    series: {
      color: '#7798BF',
      lineColor: '#A6C7ED'
    }
  },

  scrollbar: {
    barBackgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [[0.4, '#888'], [0.6, '#555']]
    },
    barBorderColor: '#CCC',
    buttonArrowColor: '#CCC',
    buttonBackgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [[0.4, '#888'], [0.6, '#555']]
    },
    buttonBorderColor: '#CCC',
    rifleColor: '#FFF',
    trackBackgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [[0, '#000'], [1, '#333']]
    },
    trackBorderColor: '#666'
  },

  // special colors for some of the
  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  background2: 'rgb(35, 35, 70)',
  dataLabelsColor: '#444',
  textColor: '#C0C0C0',
  maskColor: 'rgba(255,255,255,0.3)'
};
