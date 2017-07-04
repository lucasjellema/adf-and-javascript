package nl.amis.app.view;

import java.util.Map;

import javax.faces.context.FacesContext;

import oracle.adf.view.rich.component.rich.layout.RichPanelGridLayout;
import oracle.adf.view.rich.context.AdfFacesContext;
import oracle.adf.view.rich.render.ClientEvent;

import org.apache.myfaces.trinidad.render.ExtendedRenderKitService;
import org.apache.myfaces.trinidad.util.ComponentReference;
import org.apache.myfaces.trinidad.util.Service;

public class MenuBean {
    public MenuBean() {
        super();
        color="green";
    }
    
    private ComponentReference ColorPanelGridLayout;
    private String color;
    
    public void handleColorSelection(ClientEvent ce){
        // get payload of custom event - that we know should contain the selected color
        Map<String, Object> map = ce.getParameters();
        String newColor = (String) map.get("newColor");        
        setColor(newColor);        
        AdfFacesContext adfFacesContext = AdfFacesContext.getCurrentInstance();
        adfFacesContext.addPartialTarget(getColorPanelGridLayout());         
        
        // publish event newBackgroundColorEvent to client event bus with the newly selected color in the payload
        FacesContext context = FacesContext.getCurrentInstance();
        ExtendedRenderKitService erks =
        Service.getService(context.getRenderKit(),
               ExtendedRenderKitService.class);
String colorFulstatement;
        switch (newColor) {
            case "red":
                colorFulstatement = "There is a shade of red|for every woman (Katherine Hepburn)";
                break;
            case "yellow":
                colorFulstatement = "We all live|in the yellow submarine (The Beatles)";
                break;
            case "blue":
                colorFulstatement = "Once in a blue|moon (Astronomical Phenomenon)";
                break;
        default: 
            colorFulstatement = "Painting the sky|colorful";
        }
            erks.addScript(context, "publishEvent('newBackgroundColorEvent',{'color':'"+newColor+"','statement':'"+colorFulstatement+"'});");
    }
    
     
    public RichPanelGridLayout getColorPanelGridLayout()
    {
      if (ColorPanelGridLayout!=null)
      {
        return (RichPanelGridLayout) ColorPanelGridLayout.getComponent();
      }
      return null; 
    }
     
    public void setColorPanelGridLayout(RichPanelGridLayout ColorPanelGridLayout)
    {
      this.ColorPanelGridLayout = ComponentReference.newUIComponentReference(ColorPanelGridLayout);
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getColor() {
        return color;
    }
}
