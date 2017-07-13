package nl.amis.app.view;

import java.util.Date;

import javax.faces.component.UIComponent;
import javax.faces.component.UIViewRoot;
import javax.faces.context.FacesContext;

import javax.servlet.http.HttpServletRequest;

import oracle.adf.controller.v2.lifecycle.Lifecycle;
import oracle.adf.controller.v2.lifecycle.PagePhaseEvent;
import oracle.adf.controller.v2.lifecycle.PagePhaseListener;
import oracle.adf.view.rich.component.rich.input.RichInputText;
import oracle.adf.view.rich.context.AdfFacesContext;

import org.apache.myfaces.trinidad.render.ExtendedRenderKitService;
import org.apache.myfaces.trinidad.util.Service;

// based on https://blogs.oracle.com/jdevotnharvest/how-to-configure-an-adf-phase-listener-and-where-to-put-the-file

public class AfterPPRPhaseListener implements PagePhaseListener {
    public AfterPPRPhaseListener() {
    }

    public void afterPhase(PagePhaseEvent pagePhaseEvent) {
        FacesContext fctx = FacesContext.getCurrentInstance();
        
        if (pagePhaseEvent.getPhaseId() == Lifecycle.PREPARE_RENDER_ID) {
            boolean isPPR = fctx.getPartialViewContext().isAjaxRequest();
            if (isPPR) {
                ExtendedRenderKitService erks = Service.getRenderKitService(fctx, ExtendedRenderKitService.class);
                String myJavaScriptCode = "if (typeof notifyPPR !== 'undefined'  && typeof notifyPPR === 'function' ){ notifyPPR(); var ppr2 = AdfPage.PAGE.findComponentByAbsoluteId('ppr2');if (ppr2) {ppr2.setValue(parseInt(ppr2.getValue())+1);}}";
                // this javaScript snippet is executed for each PPR request!
                erks.addScript(fctx, myJavaScriptCode);
                System.out.println("Added call to JavaScript function notifyPPR in client");
                // add as partial target the UI Components 
                
                AdfFacesContext adfFacesContext = 
                AdfFacesContext.getCurrentInstance();    
                //make sure this code is executed on the initial page request only
                UIViewRoot viewRoot = fctx.getViewRoot();
                UIComponent ppr = viewRoot.findComponent("ppr");
                if (ppr!=null && ppr instanceof RichInputText){
                   AdfFacesContext.getCurrentInstance().addPartialTarget(ppr);
                   ((RichInputText)ppr).setValue(new Date());
                }
            }

        }
    }

    public void beforePhase(PagePhaseEvent pagePhaseEvent) {
    }

}
