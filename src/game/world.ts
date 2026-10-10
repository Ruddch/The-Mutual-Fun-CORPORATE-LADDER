export type Point={x:number;y:number};
export type ObjectKind='desk'|'plant'|'cabinet'|'sofa'|'coffee'|'table'|'chair'|'rug'|'briefcase'|'npc'|'elevator'|'board'|'reception'|'throne';
export type OfficeObject=Point&{id:string;kind:ObjectKind;name?:string;color?:string;interactive?:boolean;blocked?:boolean;role?:string};
export const WIDTH=16,HEIGHT=12;
export function createOffice(rank:number,day:number):OfficeObject[]{
 const objects:OfficeObject[]=[];
 const add=(kind:ObjectKind,x:number,y:number,id:string,extra:Partial<OfficeObject>={})=>objects.push({kind,x,y,id,blocked:!['rug','briefcase','npc'].includes(kind),...extra});
 // Distinct work zones, accessible connected aisles, executive decor on higher floors.
 for(const [i,[x,y]] of [[3,3],[6,3],[3,6],[6,6],[3,9],[6,9]].entries()){
  if(rank>=4&&i>=4){if(i===5)add('npc',8,9,'employee-5',{name:'T. Compliance',role:'Compliance',color:'#697887',interactive:true});continue;}
  add('desk',x,y,`desk-${i}`,{color:rank>=3?'#774c38':'#927553'});add('chair',x+1,y,`chair-${i}`);
  add('npc',x+1,y-1,`employee-${i}`,{name:['M. Ledger','P. Margin','A. Proxy','I. Revenue','S. Dividend','T. Compliance'][i],role:['Analyst','Senior Analyst','Accountant','Fund Manager','Shareholder Liaison','Compliance'][i],color:['#687e72','#72697d','#8b7058','#51786d','#a28d69','#697887'][i],interactive:true});
 }
 add('reception',11,3,'reception',{color:'#704835'});
 add('npc',12,2,'manager',{name:rank<3?'Your Manager':'Board Secretary',role:'Management',color:'#384e53',interactive:true});
 add('table',12,7,'meeting-table',{color:'#714431',name:'The meeting room',interactive:true});add('chair',11,7,'meeting-chair1');add('chair',13,7,'meeting-chair2');add('chair',12,6,'meeting-chair3');add('chair',13,8,'meeting-chair4');
 add('npc',13,6,'director',{name:'Mr. Quarterly',role:rank>=4?'Director':'Senior Vice President',color:'#393f58',interactive:true});
 add('coffee',1,9,'coffee',{name:'Coffee machine',interactive:true});add('sofa',1,5,'sofa');
 for(const [i,[x,y]] of [[1,1],[8,1],[14,1],[14,10],[8,10]].entries())add('plant',x,y,`plant-${i}`);
 for(const [i,[x,y]] of [[3,1],[4,1],[5,1]].entries())add('cabinet',x,y,`cabinet-${i}`);
 add('throne',13,10,'throne',{name:'Seat 0 · The Chairman’s chair',interactive:true});
 add('elevator',11,0,'elevator',{name:'Career elevator',interactive:true});add('board',1,0,'board',{name:'Personnel noticeboard',interactive:true});
 for(let i=0;i<2;i++){const points=[[9,4],[9,9],[2,7],[14,5],[5,8],[10,10]];const [x,y]=points[(day*2+i)%points.length];add('briefcase',x,y,`case-${i}`,{name:'Unclaimed Briefcase',interactive:true});}
 if(rank>=3){add('rug',12,7,'executive-rug');add('plant',10,2,'exec-plant');}
 if(rank>=2)add('cabinet',7,1,'senior-cabinet');
 if(rank>=4){add('rug',4,9,'personal-rug');add('desk',4,9,'executive-desk',{color:'#774c38'});add('chair',5,9,'executive-chair');add('plant',3,10,'personal-plant');}
 if(rank>=5){add('sofa',14,9,'exec-sofa');add('cabinet',8,1,'executive-library');}return objects;
}
export function findPath(from:Point,to:Point,objects:OfficeObject[],near=false):Point[]{
 const blocked=new Set(objects.filter(o=>o.blocked).map(o=>`${o.x},${o.y}`));const valid=(p:Point)=>p.x>=0&&p.y>=0&&p.x<WIDTH&&p.y<HEIGHT&&!blocked.has(`${p.x},${p.y}`);
 const target=near?[{x:to.x-1,y:to.y},{x:to.x+1,y:to.y},{x:to.x,y:to.y-1},{x:to.x,y:to.y+1}].filter(valid):[to].filter(valid);
 const targets=new Set(target.map(p=>`${p.x},${p.y}`));if(!targets.size)return [];
 const queue=[{x:Math.round(from.x),y:Math.round(from.y)}];const prior=new Map<string,Point|null>([[`${queue[0].x},${queue[0].y}`,null]]);let end:Point|undefined;
 for(let i=0;i<queue.length;i++){const p=queue[i];if(targets.has(`${p.x},${p.y}`)){end=p;break;}for(const n of [{x:p.x+1,y:p.y},{x:p.x-1,y:p.y},{x:p.x,y:p.y+1},{x:p.x,y:p.y-1}]){const k=`${n.x},${n.y}`;if(valid(n)&&!prior.has(k)){prior.set(k,p);queue.push(n);}}}
 if(!end)return [];const path:Point[]=[];let current:Point|null=end;while(current){path.unshift(current);current=prior.get(`${current.x},${current.y}`)??null;}return path.slice(1);
}
