import * as React from 'react';
import { useGauge } from 'use-gauge';

export default function Gauge (
    { gaugeValue, progressColor }: { gaugeValue: number, progressColor: string | undefined }
  ) {

  const diameter = 300;
  const minValue = 0;
  const maxValue = 5;
  const startAngle =  90;
  const endAngle = 270;
  const numTicks = 6;

  const offset = 36;
  const arcStrokeWidth = 24;
  const strokeLineCap = 'round'

  const tickColor = "#ccc";
  const tickLength = 10;

  const baseRadius = 12;
  const tipRadius = 2;
  const needleColor = '#374151';
  const needleOffset = 35;

  const {
    ticks,
    getTickProps,
    getLabelProps,
    valueToAngle,
    angleToValue,
    getArcProps,
    getNeedleProps,
    getSVGProps,
  } = useGauge({
    startAngle,
    endAngle,
    numTicks,
    diameter,
    domain: [minValue, maxValue],
  });

  const { tip, base, points } = getNeedleProps({
    value: gaugeValue,
    baseRadius,
    tipRadius,
    offset: needleOffset,
  });

  return (  
    <div className='flex'>
      <svg {...getSVGProps()} className="max-w-full overflow-visible">
        <path
          {...getArcProps({
            offset,
            startAngle,
            endAngle,
          })}
          fill="none"
          className="stroke-gray-100"
          strokeWidth={arcStrokeWidth}
          // @ts-ignore
          strokeLinecap={strokeLineCap}
        />
        {gaugeValue > minValue && (
          <path
            {...getArcProps({
              offset,
              startAngle,
              endAngle: valueToAngle(gaugeValue),
            })}
            fill="none"
            stroke={progressColor}
            strokeWidth={arcStrokeWidth}
            // @ts-ignore
            strokeLinecap={strokeLineCap}
          />
        )}
        <g id="ticks">
          {ticks.map((angle) => {
            const { key, x1, y1, x2, y2 } = getTickProps({ angle, length: tickLength });
            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line
                  stroke={tickColor}
                  key={key}
                  {...{x1, y1, x2, y2}}
                />
                <text
                  className="text-sm fill-gray-500 font-medium"
                  {...getLabelProps({ angle, offset: 20 })}
                >
                  {angleToValue(angle)}
                </text>
              </React.Fragment>
            );
          })}
        </g>
        <g id="needle">
          <circle className="fill-gray-300" {...base} r={24} />
          <circle fill={needleColor} {...base} />
          <circle fill={needleColor} {...tip} />
          <polyline fill={needleColor} points={points} />
          <circle className="fill-white" {...base} r={4} />
        </g>
      </svg>
      
    </div>
  );
};