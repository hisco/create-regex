
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-spies'));

const {RegExpFactory} = require('../../src/create-regex');

describe('RegExpFactory', ()=> {
    let factory;
    beforeEach(()=>{
        factory = new RegExpFactory({
            
        })
    });
    describe('#create', ()=> {
        it('should create regex with mixins when result is string' , ()=>{
            const mixins = {
                test: {
                }
            }
            let calledWith; 
            factory = new RegExpFactory({
                mixins
            })
            const regex = factory.create((mixins)=>{
                calledWith = mixins;
                return '45'
            } , 'mi');

            expect(regex.source).to.equal('45'); 
            expect(calledWith && calledWith.test).to.eq(mixins.test) 
        });
        it('should create regex string with mixins when result is arrary of strings' , ()=>{
            const mixins = {
                test: {
                }
            }
            let calledWith; 
            factory = new RegExpFactory({
                mixins
            })
            const regex = factory.create((mixins)=>{
                calledWith = mixins;
                return ['45']
            } , 'mi');

            expect(regex.source).to.equal('45'); 
            expect(calledWith && calledWith.test).to.eq(mixins.test) 
        });
    });
    describe('#nonCaptureGroup', ()=> {
        it('should create nonCaptureGroup' , ()=>{
            expect(factory.nonCaptureGroup('f')).to.eq('(?:f)')
        })
    })
    describe('#nonCaptureGroupWithSeperator', ()=> {
        it('should create nonCaptureGroupWithSeperator with multiple patterns' , ()=>{
            expect(factory.nonCaptureGroupWithSeperator(['f1','f2'],'}')).to.eq('(?:(?:f1)}(?:f2))')
        })
        it('should create nonCaptureGroupWithSeperator with multiple patterns default sep' , ()=>{
            expect(factory.nonCaptureGroupWithSeperator(['f1','f2'])).to.eq('(?:(?:f1)|(?:f2))')
        })
        it('should create nonCaptureGroupWithSeperator with single pattern' , ()=>{
            expect(factory.nonCaptureGroupWithSeperator('f','}')).to.eq('(?:(?:f))')
        })
    })
    describe('#group', ()=> {
        it('should create named group' , ()=>{
            expect(factory.group('name','f')).to.eq('(?<name>f)')
        })
    })
    describe('#groupWithSeperator', ()=> {
        it('should create named group with sep' , ()=>{
            expect(factory.groupWithSeperator('name','f','I')).to.eq('(?<name>(?:(?:f)))')
        })
    })
    describe('#wrapPattern', ()=> {
        it('should wrap pattern inside wrappers' , ()=>{
            expect(factory.wrapPattern('f',['"',"'"])).to.eq(`(?:(?:"f")|(?:'f'))`)
        })
    })
    describe('#indexedGroupFactory', ()=> {
        it('should cury index as first paramter to cb' , ()=>{
            let indexFactory = factory.indexedGroupFactory((i)=>i);
            expect(indexFactory()).to.eq(0)
            expect(indexFactory()).to.eq(1)
            expect(indexFactory()).to.eq(2)
        })
    })
    describe('#clone', ()=> {
        it('should clone the regex source and flags enabled' , ()=>{
            const regex = factory.clone(/aa/mgiuys);

            expect(regex.source).eq('aa')
            expect(regex.global).eq(true)
            expect(regex.multiline).eq(true)
            expect(regex.ignoreCase).eq(true)
            expect(regex.dotAll).eq(true)
            expect(regex.sticky).eq(true)
            expect(regex.unicode).eq(true)
        });
        it('should clone the regex source and flags disabled' , ()=>{
            const regex = factory.clone(/aa/);

            expect(regex.source).eq('aa')
            expect(regex.global).eq(false)
            expect(regex.multiline).eq(false)
            expect(regex.ignoreCase).eq(false)
            expect(regex.dotAll).eq(false)
            expect(regex.sticky).eq(false)
            expect(regex.unicode).eq(false)
        });
        it('should clone the regex lastIndex if number' , ()=>{
            const r = /aa/;
            r.lastIndex = 101;
            const regex = factory.clone(r);

            expect(regex.lastIndex).eq(101)
        });
        it('should not clone the regex lastIndex if not a number' , ()=>{
            const r = /aa/;
            r.lastIndex = 'this is not a number';
            const regex = factory.clone(r);

            expect(regex.lastIndex).eq(0)
        });
    })
});