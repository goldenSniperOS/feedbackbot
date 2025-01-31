"use client";
import BarChart from "./BarChart";
import DonutPieChart from "./DonutPieChart";
import Gauge from "./Gauge";
import LineChart from "./LineChart";
import {
  MessageClassification,
  MessageClassificationType,
} from "@/types/message";
import WortwolkeGroup from "./WortwolkeGroup";

const PROGRESS_COLORS = [
  { progressColor: "#c00000", min: 0, max: 1.5, classification: "Negative" },
  { progressColor: "#ffbf04", min: 1.5, max: 3.5, classification: "Neutral" },
  { progressColor: "#71ad47", min: 3.5, max: 5, classification: "Positive" },
];

const BAR_LABELS = [
  { intent: "package", label: "Verpackung" },
  { intent: "delivery", label: "Lieferung" },
  { intent: "purchase", label: "Kauf" },
  { intent: "Produktbeschreibung", label: "Produktbeschreibung" },
  { intent: "pricing", label: "Preis" },
  { intent: "quality", label: "Qualität" },
];

const getPercentageByClassification = (
  classificationIntent: string,
  classifications: MessageClassification[]
): number => {
  const filteredClassificationsLength = classifications.filter(
    (c) => c.intent === classificationIntent
  ).length;
  return (filteredClassificationsLength * 100) / classifications.length;
};

const getLabelByCategory = (intent: string, barLabels: { intent: string; label: string }[]): string => {
  const labelObject = barLabels.find((l) => intent.includes(l.intent));
  return labelObject ? labelObject.label : intent;
};

export default function Reports({ classifications }: { classifications: MessageClassification[] }) {
  const filteredClassifications = classifications.filter(
    (c) => c.intent !== "None"
  );
  const positiveClassifications = filteredClassifications.filter(
    (c) => c.type === MessageClassificationType.positive
  );
  const negativeClassifications = filteredClassifications.filter(
    (c) => c.type === MessageClassificationType.negative
  );
  const positiveRatio =
    positiveClassifications.length / filteredClassifications.length;
  const gaugeValue = positiveRatio * 5;
  const positivePercentage = positiveRatio * 100;
  const negativePercentage = 100 - positivePercentage;
  const selectedColor = PROGRESS_COLORS.find(
    (c) => gaugeValue >= c.min && gaugeValue < c.max
  );

  const positivePercentageData = Array.from(
    new Set(positiveClassifications.map((c) => c.intent))
  )
    .map((i: string) => ({
      intent: getLabelByCategory(i, BAR_LABELS),
      original_intent: i,
      percentage: getPercentageByClassification(i, positiveClassifications),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const negativePercentageData = Array.from(
    new Set(negativeClassifications.map((c) => c.intent))
  )
    .map((i) => ({
      intent: getLabelByCategory(i, BAR_LABELS),
      original_intent: i,
      percentage: getPercentageByClassification(i, negativeClassifications),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="space-y-10">
      <div className="flex justify-center space-x-10 max-h-[350px]">
        <div className="border border-white p-5 w-1/5 flex justify-center items-center">
          <Gauge
            gaugeValue={gaugeValue}
            progressColor={selectedColor?.progressColor}
          />
        </div>
        <div className="flex flex-col items-center justify-center text-center text-4xl leading-tight w-1/6">
          <h2 className="font-bold">{gaugeValue.toFixed(2)}</h2>
          <h2 className="mt-4">{selectedColor?.classification}</h2>
        </div>
        <div className="max-h-[270px] w-1/5">
          <DonutPieChart
            positiveClassificationsLength={positiveClassifications.length}
            negativeClassificationsLength={negativeClassifications.length}
          />
        </div>
        <div className="flex flex-col items-center justify-center text-center text-4xl leading-tight w-1/6">
          <h2 className="font-bold">{positivePercentage.toFixed(0)}%</h2>
          <h2 className="mt-4">Positive</h2>
          <h2 className="font-bold">{negativePercentage.toFixed(0)}%</h2>
          <h2 className="mt-4">Negative</h2>
        </div>
      </div>
      <div className="flex justify-center space-x-10 max-h-[350px]">
        <div className="w-1/3">
          <BarChart
            percentageData={positivePercentageData}
            description="positive"
            borderColor="rgba(113, 173, 71, 1)"
            backgroundColor="rgba(113, 173, 71, 0.5)"
          />
        </div>
        <div className="w-1/3">
          <WortwolkeGroup
            classifications={positiveClassifications}
            optionButtons={positivePercentageData.slice(0, 3)}
          />
        </div>
        <div className="w-1/3">
          <LineChart
            classifications={positiveClassifications}
            description="Positive mentions over the year"
          />
        </div>
      </div>
      <div className="flex justify-center space-x-10 max-h-[350px]">
        <div className="w-1/3">
          <BarChart
            percentageData={negativePercentageData}
            description="negative"
            borderColor="rgba(192, 0, 0, 1)"
            backgroundColor="rgba(192, 0, 0, 0.5)"
          />
        </div>
        <div className="w-1/3">
          <WortwolkeGroup
            classifications={negativeClassifications}
            optionButtons={negativePercentageData.slice(0, 3)}
          />
        </div>
        <div className="w-1/3">
          <LineChart
            classifications={negativeClassifications}
            description="Negative mentions over the year"
          />
        </div>
      </div>
    </div>
  );
}
