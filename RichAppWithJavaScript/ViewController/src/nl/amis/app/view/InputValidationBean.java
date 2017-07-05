package nl.amis.app.view;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

import oracle.adf.share.logging.ADFLogger;
import oracle.adf.view.rich.render.ClientEvent;

import org.apache.myfaces.trinidad.render.ExtendedRenderKitService;
import org.apache.myfaces.trinidad.util.Service;

public class InputValidationBean {
    private static ADFLogger logger = ADFLogger.createADFLogger(InputValidationBean.class);

    public void handleValidationEvent(ClientEvent ce) {
        // get client id from event
        Object obj = ce.getParameters().get("fcid");
        String clientId = "";
        if (obj != null) {
            clientId = obj.toString();
        }

        // get field value from event
        String val = "";
        Object obj2 = ce.getParameters().get("fvalue");
        if (obj2 != null) {
            val = obj2.toString();
        }

        logger.info("client" + clientId + " value=" + val);
        // do a check if hte value if OK
        // here we check against 88 to keep it simple. You can check against other model values here too!
        if ("88".equals(val)) {
            // check failed -> add message to the component and set the focus back to the component
            FacesContext facesContext = FacesContext.getCurrentInstance();
            FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error", "Wrong value - clearly "+val+" is not a good value");
            facesContext.addMessage(clientId, msg);
            // javascript to set focus to component identified by it's clientId
            String script = "var t=document.getElementById('" + clientId + "::content');t.focus();";
            writeJavaScriptToClient(script);
        }
    }

    //generic, reusable helper method to call JavaScript on a client
    private void writeJavaScriptToClient(String script) {
        FacesContext fctx = FacesContext.getCurrentInstance();
        ExtendedRenderKitService erks = null;
        erks = Service.getRenderKitService(fctx, ExtendedRenderKitService.class);
        erks.addScript(fctx, script);
    }
}
