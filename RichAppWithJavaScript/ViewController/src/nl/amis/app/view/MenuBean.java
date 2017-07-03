package nl.amis.app.view;

import java.util.Map;

import oracle.adf.view.rich.component.rich.layout.RichPanelGridLayout;
import oracle.adf.view.rich.context.AdfFacesContext;
import oracle.adf.view.rich.render.ClientEvent;

import org.apache.myfaces.trinidad.util.ComponentReference;

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
