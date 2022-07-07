import { Axis } from '@visx/axis';
import { curveNatural } from '@visx/curve';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { GridColumns } from '@visx/grid';
import { scaleLinear, scaleTime } from '@visx/scale';
import { Bar, LinePath } from '@visx/shape';
import { defaultStyles, Tooltip, withTooltip } from '@visx/tooltip';
import type { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { useCallback, useEffect, useRef, useState } from 'react';

type TooltipData = {
  dataX: Date;
  dataY: string;
};

export type BarStackHorizontalProps = {
  height?: number;
  padding?: number;
  events?: boolean;
};

export default withTooltip<BarStackHorizontalProps, TooltipData>(
  ({
    height = 400,
    padding = 56,
    showTooltip,
    hideTooltip,
    tooltipLeft,
    tooltipTop,
    tooltipData,
  }: BarStackHorizontalProps & WithTooltipProvidedProps<TooltipData>) => {
    const lineRef = useRef(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    const data = [
      [new Date('2020-01-01'), 0],
      [new Date('2020-01-02'), 10],
      [new Date('2020-01-03'), 30],
      [new Date('2020-01-04'), 20],
      [new Date('2020-01-05'), 0],
    ];

    const xScale = scaleTime({
      domain: [new Date('2020-01-01'), new Date('2020-01-05')],
      range: [0 + padding, width - padding],
    });

    const yScale = scaleLinear({
      domain: [0, 40],
      range: [height - padding, padding],
    });

    const colors = {
      white: '#FFFFFF',
      black: '#1B1B1B',
      gray: '#98A7C0',
      darkGray: '#2A2A2A',
      accent: '#40FEAE',
      darkAccent: '#256769',
    };

    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x, y } = localPoint(event) || { x: 0, y: 0 };
        const x0 = xScale.invert(x);
        const y0 = yScale.invert(y);
        showTooltip({
          tooltipData: { dataX: x0, dataY: y0.toFixed(0) },
          tooltipLeft: x,
          tooltipTop: y,
        });
      },
      [showTooltip, xScale, yScale]
    );

    useEffect(() => {
      setWidth(wrapperRef.current?.offsetWidth || 0);
    }, [lineRef, width]);

    return (
      <div
        style={{
          marginTop: 60,
          width: '100%',
          border: '1px solid #e7e7e7',
          borderRadius: '16px',
        }}
        ref={wrapperRef}
      >
        <svg height={height} width={width}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            style={{
              fill: 'transparent',
            }}
            rx={14}
          />

          <Axis
            scale={xScale}
            numTicks={5}
            top={height - padding}
            orientation="bottom"
            strokeWidth={0}
            tickLabelProps={() => ({
              fill: colors.gray,
              textAnchor: 'middle',
              verticalAnchor: 'middle',
            })}
          />

          <Axis
            // hideZero
            scale={yScale}
            numTicks={5}
            left={padding}
            orientation="left"
            strokeWidth={0}
            tickLabelProps={() => ({
              fill: colors.gray,
              textAnchor: 'end',
              verticalAnchor: 'middle',
            })}
          />

          <GridColumns
            top={padding}
            scale={xScale}
            height={height - padding * 2}
            strokeDasharray="4"
            stroke={'#CAC8FB'}
            strokeOpacity={1}
            pointerEvents="none"
          />

          <LinearGradient id="line-gradient" from={'#928FDF'} to={'#928FDF'} />

          <LinePath
            data={data}
            x={(d: any) => xScale(d[0])}
            y={(d: any) => yScale(d[1])}
            innerRef={lineRef}
            stroke="url('#line-gradient')"
            strokeWidth={3}
            curve={curveNatural}
            markerEnd="url(#marker-circle)"
          />

          <LinearGradient
            id="area-gradient"
            from={colors.accent}
            to={colors.accent}
            toOpacity={0.1}
          />

          <Bar
            x={padding}
            y={padding}
            width={width - padding * 2}
            height={height - padding * 2}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </svg>

        {tooltipData && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              minWidth: 72,
              textAlign: 'center',
              transform: 'translateX(-50%)',
            }}
          >
            <div>{tooltipData.dataX?.toString()}</div>
            {/* <div>{tooltipData.dataY?.toString()}</div> */}
          </Tooltip>
        )}
      </div>
    );
  }
);
