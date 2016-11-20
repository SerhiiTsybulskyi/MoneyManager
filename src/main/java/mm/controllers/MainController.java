package mm.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MainController {

  // Match everything without a suffix (so not a static resource)
  @RequestMapping(value = "/{[path:[^\\.]*}")
  public ModelAndView redirect() {
    // Forward to home page so that route is preserved.
    return new ModelAndView("forward:/");
  }

  @RequestMapping(value = "/get-random-number")
  public Integer getRandomNumber() {
    return (int) (Math.random() * 10);
  }

}
