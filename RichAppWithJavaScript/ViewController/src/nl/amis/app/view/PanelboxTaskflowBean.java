package nl.amis.app.view;

import javax.faces.context.FacesContext;

import oracle.adf.view.rich.component.rich.nav.RichButton;

import org.apache.myfaces.trinidad.util.ComponentReference;

public class PanelboxTaskflowBean {
   

    public PanelboxTaskflowBean() {
        super();
    }
    
    private ComponentReference localanchor;
      public void setLocalAnchor(RichButton clientButton){
        this.localanchor = ComponentReference.newUIComponentReference(clientButton);
      }
      public RichButton getLocalAnchor(){
        if (localanchor != null){
         return (RichButton)localanchor.getComponent();
        }
        else{
         return null;
        }
      }

    public String getLocalAnchorClientId(){
       FacesContext ctx = FacesContext.getCurrentInstance();
       return this.getLocalAnchor().getClientId(ctx);
     }
}
