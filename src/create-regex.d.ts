declare module RegExpFactory{
	export class RegExpFactory<T>{
		constructor(props: RegExpFactoryProps<T>)
		create(cb: (regExpCreateParams?:RegExpCreateParams)=>string|string[] , flags:string):T;
		nonCaptureGroup(pattern: string):string;
		nonCaptureGroupWithSeperator(patterns: string | string[], sep: string):string;
		group(name:string, pattern: string):string;
		groupWithSeperator(name:string, patterns: string| string[], sep: string):string;
		wrapPattern(pattern: string, wrappers: string[]);
		indexedGroupFactory(cb: (i:number)=>string):string;
	}
	interface RegExpFactoryProps<T>{
		RegExp?: RegExp| T;
		mixins?: {[key:string]: {bind:(context:any)=>(()=>void)}}
	}
	interface RegExpCreateParams{
		nonCaptureGroup?(pattern: string):string;
		nonCaptureGroupWithSeperator?(patterns: string | string[], sep: string):string;
		group?(name:string, pattern: string):string;
		groupWithSeperator?(name:string, patterns: string| string[], sep: string):string;
		wrapPattern?(pattern: string, wrappers: string[]);
		indexedGroupFactory?(cb: (i:number)=>string):string;
		[key:string]:any
	}
	
}
export = RegExpFactory;