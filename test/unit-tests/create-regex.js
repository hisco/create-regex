
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
        it('should create regex with mixins' , ()=>{
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
});