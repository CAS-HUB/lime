/*
 * Copyright (c) 2014 - Copyright holders CIRSFID and Department of
 * Computer Science and Engineering of the University of Bologna
 * 
 * Authors: 
 * Monica Palmirani – CIRSFID of the University of Bologna
 * Fabio Vitali – Department of Computer Science and Engineering of the University of Bologna
 * Luca Cervone – CIRSFID of the University of Bologna
 * 
 * Permission is hereby granted to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The Software can be used by anyone for purposes without commercial gain,
 * including scientific, individual, and charity purposes. If it is used
 * for purposes having commercial gains, an agreement with the copyright
 * holders is required. The above copyright notice and this permission
 * notice shall be included in all copies or substantial portions of the
 * Software.
 * 
 * Except as contained in this notice, the name(s) of the above copyright
 * holders and authors shall not be used in advertising or otherwise to
 * promote the sale, use or other dealings in this Software without prior
 * written authorization.
 * 
 * The end-user documentation included with the redistribution, if any,
 * must include the following acknowledgment: "This product includes
 * software developed by University of Bologna (CIRSFID and Department of
 * Computer Science and Engineering) and its authors (Monica Palmirani, 
 * Fabio Vitali, Luca Cervone)", in the same place and form as other
 * third-party acknowledgments. Alternatively, this acknowledgment may
 * appear in the software itself, in the same form and location as other
 * such third-party acknowledgments.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

Ext.define('AknTabXmlPreview.controller.AknPreviewController', {
    extend : 'Ext.app.Controller',
    
    views: ["AknTabXmlPreview.view.AknPreviewMainTab"],

    refs : [{
        selector : 'appViewport',
        ref : 'appViewport'
    }, {
        selector: 'aknPreviewMainTab',
        ref: 'xml'
    }],

    config : {
        pluginName : "aknPreview"
    },
    
    doTranslate: function() {
        if(this.getXml()) {
            var me = this,
                activeTab = this.getXml().up("main").getActiveTab();
            if (activeTab == this.getXml()) {
                me.application.fireEvent(Statics.eventsNames.translateRequest, function(xml) {
                    me.updateContent(xml);
                }, this.getXml());    
            }
        }
    },
    
    /**
     * Actually update the related view with the given content
     * @param {String} content
     * @private
     */
    updateContent : function(content) {
        if (this.getXml() && content != this.content) {
            this.getXml().down('codemirror').setValue(content);
            this.content = content;
        }
    },
    
    onRemoveController: function() {
        var me = this;
        me.application.removeListener(Statics.eventsNames.afterLoad, me.doTranslate, me);
    },
    
    onInitPlugin: function() {
        var me = this;
        me.application.on(Statics.eventsNames.afterLoad, me.doTranslate, me);
    },
    
    init : function() {
        var me = this;
        this.control({
            'aknPreviewMainTab' : {
                activate : me.doTranslate
            }
        });
    }
});