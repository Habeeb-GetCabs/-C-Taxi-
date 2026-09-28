import React from 'react';
import { Target, CheckCircle2, ChevronDown } from 'lucide-react';
import { AD_CAMPAIGN_PRESETS } from '../data/taxiData';

interface CampaignBannerProps {
  currentCampaignId: string;
  onSelectCampaign: (id: string) => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({
  currentCampaignId,
  onSelectCampaign,
}) => {
  const currentPreset = AD_CAMPAIGN_PRESETS.find(p => p.id === currentCampaignId) || AD_CAMPAIGN_PRESETS[0];

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        
        {/* Google Ads Campaign Scent Status */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 font-semibold text-amber-400 uppercase tracking-wider text-[11px] bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Google Ads Quality Score Mode
          </span>
          <span className="text-neutral-400 hidden sm:inline">|</span>
          <span className="text-neutral-300">
            Active Search Intent: <strong className="text-white font-mono bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">"{currentPreset.query}"</strong>
          </span>
          <span className="hidden lg:flex items-center gap-1 text-emerald-400 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Message Match
          </span>
        </div>

        {/* Quick Campaign Switcher to test conversion variants */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-neutral-400 text-[11px]">Test Ad Group:</span>
          <div className="relative">
            <select
              value={currentCampaignId}
              onChange={(e) => onSelectCampaign(e.target.value)}
              className="appearance-none bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium py-1 pl-2.5 pr-7 rounded border border-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer transition-colors"
            >
              {AD_CAMPAIGN_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
};
