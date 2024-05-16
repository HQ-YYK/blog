import { skillsData } from '@/data/UI'

export default class Render {
  domElements: { skillsRenderContainer: HTMLElement | null }
  skills: { name: string; width: string }[]

  constructor() {
    this.domElements = {
      skillsRenderContainer: document.getElementById(
        'about-skills-render-container'
      ),
    }
    this.skills = skillsData
    this.renderSkills()
  }
  renderSkills() {
    this.skills.forEach((skill) => {
      this.domElements.skillsRenderContainer &&
        this.domElements.skillsRenderContainer.insertAdjacentHTML(
          'beforeend',
          `
            <div id="about-skill-container-${this.skills.indexOf(
              skill
            )}" class="row about-skill-container">
                <span id="about-skill-span-${this.skills.indexOf(
                  skill
                )}" class="about-skill-span">${skill.name}</span>
                <div class="about-skill-bar-container">
                    <div id="about-skill-bar-${this.skills.indexOf(
                      skill
                    )}" class="about-skill-bar" style="width: ${
            skill.width
          }"></div>
                </div>
            </div>
        `
        )
    })
  }
}
