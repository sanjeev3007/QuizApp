import React from "react";
import { cn } from "@/lib/utils";
import "./graph.css";

type Props = {};

const ScoreGraph = (props: Props) => {
    const data = [1, 0, 4, 3, 5, 2, 6, 7, 2, 0];
    const labels = [
        "Quiz 1",
        "Quiz 2",
        "Quiz 3",
        "Quiz 4",
        "Quiz 5",
        "Quiz 6",
        "Quiz 7",
        "Quiz 8",
        "Quiz 9",
        "Quiz 10",
    ];
    const maxBarHeight = 136;
    const minBarHeight = 20;
    const maxValue = Math.max(...data);
    const scalingFactor =
        maxValue === 0 ? 0 : (maxBarHeight - minBarHeight) / maxValue;
    return (
        <div className="custom-bar-graph">
            {data?.length > 0 &&
                data?.map((value, index) => (
                    <div key={index} className={cn(index > 0 && "ml-[2rem]")}>
                        <div
                            key={index}
                            className="bar"
                            style={{
                                height: `${value === 0
                                        ? minBarHeight
                                        : minBarHeight + value * scalingFactor
                                    }px`,
                            }}
                        >
                            <span className="bar-value" style={{ color: "#FFF" }}>
                                {value}
                            </span>
                        </div>
                        <div
                            style={{
                                color: "#569090",
                                maxWidth: "30px",
                                overflowWrap: "break-word",
                                textAlign: "center",
                                fontSize: "12px",
                                marginTop: "5px"
                            }}
                        >
                            {labels[index]}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ScoreGraph;
