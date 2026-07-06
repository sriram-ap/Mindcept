"use client";

import { useId, useState } from "react";
import { formatINR, formatNumber } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Tab = "land" | "roi" | "value";

function Field({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-muted">
        {label}
        {suffix ? ` (${suffix})` : ""}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink focus:border-ember focus:outline-none"
      />
    </div>
  );
}

function Result({ label, value, big = false }: { label: string; value: string; big?: boolean }) {
  return (
    <div className={big ? "col-span-2 sm:col-span-3" : ""}>
      <p className={`font-display font-semibold text-jewel ${big ? "text-3xl" : "text-xl"}`}>
        {value}
      </p>
      <p className="mt-0.5 text-xs uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

export function Calculators() {
  const [tab, setTab] = useState<Tab>("land");

  // Land area
  const [len, setLen] = useState(200);
  const [wid, setWid] = useState(150);
  const area = len * wid;

  // ROI
  const [price, setPrice] = useState(50_000_000);
  const [rent, setRent] = useState(4_200_000);
  const [expenses, setExpenses] = useState(600_000);
  const [years, setYears] = useState(5);
  const [appreciation, setAppreciation] = useState(7);
  const net = rent - expenses;
  const exit = price * Math.pow(1 + appreciation / 100, Math.max(1, years));
  const gain = net * Math.max(1, years) + (exit - price);
  const totalRoi = price ? (gain / price) * 100 : 0;

  // Project value
  const [builtUp, setBuiltUp] = useState(100_000);
  const [costPsf, setCostPsf] = useState(2200);
  const [landCost, setLandCost] = useState(80_000_000);
  const [rentPsf, setRentPsf] = useState(24);
  const [capRate, setCapRate] = useState(8.5);
  const constructionCost = builtUp * costPsf;
  const totalCost = constructionCost + landCost;
  const annualRent = builtUp * rentPsf * 12;
  const capValue = annualRent / (Math.max(0.1, capRate) / 100);
  const yieldOnCost = totalCost ? (annualRent / totalCost) * 100 : 0;
  const upside = capValue - totalCost;

  const tabs: { key: Tab; label: string }[] = [
    { key: "land", label: "Land Area" },
    { key: "roi", label: "Real Estate ROI" },
    { key: "value", label: "Project Value" },
  ];

  return (
    <section id="tools" className="scroll-mt-20 bg-[#faf7f0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tools"
          title="Real estate calculators."
          lead="Quick, indicative estimates for land area, investment returns and industrial / warehouse project value. For a full assessment, talk to our advisory team."
        />

        <div className="mt-10 rounded-card border border-line bg-white p-6 shadow-sm sm:p-8">
          <div role="tablist" aria-label="Calculators" className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  tab === t.key
                    ? "bg-jewel text-white"
                    : "bg-line/40 text-ink hover:bg-line/70"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "land" ? (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2">
                <Field label="Length" suffix="ft" value={len} onChange={setLen} />
                <Field label="Width" suffix="ft" value={wid} onChange={setWid} />
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <Result big label="Total area" value={`${formatNumber(area)} sq ft`} />
                <Result label="Acres" value={(area / 43560).toFixed(3)} />
                <Result label="Sq metres" value={formatNumber(area * 0.092903)} />
                <Result label="Sq yards" value={formatNumber(area / 9)} />
                <Result label="Hectares" value={(area / 107639).toFixed(3)} />
                <Result label="Guntha" value={(area / 1089).toFixed(1)} />
                <Result label="Grounds" value={(area / 2400).toFixed(1)} />
              </div>
            </div>
          ) : null}

          {tab === "roi" ? (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2">
                <Field label="Purchase price" suffix="₹" value={price} onChange={setPrice} />
                <Field label="Annual rental income" suffix="₹" value={rent} onChange={setRent} />
                <Field label="Annual expenses" suffix="₹" value={expenses} onChange={setExpenses} />
                <Field label="Holding period" suffix="years" value={years} onChange={setYears} />
                <Field label="Expected appreciation" suffix="% / yr" value={appreciation} onChange={setAppreciation} />
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <Result big label="Net rental yield" value={`${(price ? (net / price) * 100 : 0).toFixed(1)}%`} />
                <Result label="Net annual income" value={formatINR(net)} />
                <Result label="Gross yield" value={`${(price ? (rent / price) * 100 : 0).toFixed(1)}%`} />
                <Result label="Projected value" value={formatINR(exit)} />
                <Result label="Total ROI" value={`${totalRoi.toFixed(0)}%`} />
                <Result label="Annualised ROI" value={`${(totalRoi / Math.max(1, years)).toFixed(1)}%`} />
                <Result label="Est. total gain" value={formatINR(gain)} />
              </div>
            </div>
          ) : null}

          {tab === "value" ? (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2">
                <Field label="Built-up area" suffix="sq ft" value={builtUp} onChange={setBuiltUp} />
                <Field label="Construction cost" suffix="₹ / sq ft" value={costPsf} onChange={setCostPsf} />
                <Field label="Land cost" suffix="₹" value={landCost} onChange={setLandCost} />
                <Field label="Expected rent" suffix="₹ / sq ft / month" value={rentPsf} onChange={setRentPsf} />
                <Field label="Capitalisation rate" suffix="%" value={capRate} onChange={setCapRate} />
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                <Result big label="Total project cost" value={formatINR(totalCost)} />
                <Result label="Construction cost" value={formatINR(constructionCost)} />
                <Result label="Annual rent potential" value={formatINR(annualRent)} />
                <Result label="Capital value @ cap rate" value={formatINR(capValue)} />
                <Result label="Yield on cost" value={`${yieldOnCost.toFixed(1)}%`} />
                <Result label="Cost / sq ft" value={`₹${formatNumber(builtUp ? totalCost / builtUp : 0)}`} />
                <Result
                  label="Value vs cost"
                  value={`${upside >= 0 ? "+" : ""}${formatINR(upside)}`}
                />
              </div>
            </div>
          ) : null}

          <p className="mt-8 border-t border-line pt-4 text-xs text-muted">
            Indicative only. Figures are estimates and not a valuation, offer or advice.
          </p>
        </div>
      </div>
    </section>
  );
}
