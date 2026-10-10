import type {State}from'../engine';
export type Assignment={id:string;label:string;action:string;source:string};
const stops:Assignment[]=[
{id:'manager',label:'Management',action:'Meet your Manager',source:'Manager’s memo'},
{id:'employee-0',label:'M. Ledger',action:'Talk to M. Ledger',source:'Colleague’s request'},
{id:'employee-2',label:'Accounting',action:'Visit Accounting',source:'Accounting’s memo'},
{id:'employee-5',label:'Compliance',action:'Speak to Compliance',source:'Compliance notice'},
{id:'director',label:'Mr. Quarterly',action:'Meet Mr. Quarterly',source:'Director’s request'},
{id:'meeting-table',label:'The meeting room',action:'Attend the meeting',source:'Meeting room agenda'},
{id:'coffee',label:'The coffee machine',action:'Check the coffee machine',source:'Break room notice'},
{id:'board',label:'The noticeboard',action:'Read the noticeboard',source:'Personnel notice'},
];
function order(seed:string){let value=2166136261;for(const char of seed)value=Math.imul(value^char.charCodeAt(0),16777619);const result=[...stops];for(let i=result.length-1;i>0;i--){value=(Math.imul(value,1664525)+1013904223)>>>0;const j=value%(i+1);[result[i],result[j]]=[result[j],result[i]];}return result;}
// A seeded shuffled itinerary: every destination appears, without consecutive repeats.
// It is independent of loot RNG, so the marker cannot move after opening a Briefcase.
export function assignmentFor(s:State):Assignment{if(s.day===15)return{id:'meeting-table',label:'The Board meeting',action:'Attend the final Board meeting',source:'Final Board agenda'};const itinerary=order(s.seed);const selected=itinerary[(s.day-1)%stops.length];if(s.day===14&&selected.id==='meeting-table')return itinerary.find(stop=>stop.id!=='meeting-table'&&stop.id!==itinerary[4].id)!;return selected;}
export const itineraryStops=stops;
