
function insureArray(stringOrArray = ''){
    return stringOrArray instanceof Array ? stringOrArray : [stringOrArray];
}
class RegExpFactory{
    constructor(props = {}){
        this.mixins = props.mixins || {};
        this.RegExp = props.RegExp || RegExp;
    }
    create(cb , flags){
        const helpers = Object.assign({
           
        } , this.mixins);
        ['nonCaptureGroupWithSeperator','indexedGroupFactory','nonCaptureGroup','group','groupWithSeperator','wrapPattern'].forEach((key)=>{
            helpers[key]= this[key].bind(this)
        })
        const buildResult = cb.call(this,helpers);
        return new (this.RegExp)(Array.prototype.join.call(typeof buildResult == 'string' ? [buildResult] : buildResult,'|'),flags)
    }
    nonCaptureGroup(pattern){
        return  `(?:${pattern})`;
    }
    nonCaptureGroupWithSeperator(patterns , sep = '|'){
        patterns = insureArray(patterns).filter(p=>p);
        return  `(?:${patterns.map(p=>this.nonCaptureGroup(p)).join(sep)})`;
    }
    group(name , pattern){
        return `(?<${name}>${pattern})`;
    }
    groupWithSeperator(name , patterns , sep = '|'){        
        return `(?<${name}>${
            this.nonCaptureGroupWithSeperator(patterns,sep)
        })`
    }
    wrapPattern(pattern , wrappers){
        return `(?:${wrappers.map(sign=> this.nonCaptureGroup(`${sign}${pattern}${sign}`)).join('|')})`
    }
    indexedGroupFactory(cb){
        let i = 0;
        return ()=>cb(i++)
    }
}
module.exports = {
    RegExpFactory
}