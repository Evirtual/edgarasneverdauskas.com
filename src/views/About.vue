<template>
  <div class="about">
    <div v-for="profile in profiles" :key="profile.id">
      <div class="about-info">
        <h3>Hello World!</h3>
        <p>Life for me is like a Living Cell and by contributing my observations I want to share the same view with everyone. We are all one big collaborative family. Everything is connected and alive.</p>
        <h4>A little bit info about my current activities:</h4>
        <p>I enjoy traveling, visiting places that I've never been before and at the same time taking scenery pictures and videos, spending time in nature (especially forests, beaches, mountains and lakes). It gives me peace and more understanding of the life we are in.</p>
        <p>Another passion I have is exploring dreams, talk about them and analyzing the connection to the waken world as well as talking about life itself and I am happy to share those thoughts with everyone.</p>
        <h4>UX consultancy and development:</h4>
        <p>Over the past decade I spent time learning design practices in a digital world and imerssed myself into the code to make designs become usable interfaces not only for practicality but also for personal interest in art and mathematics.</p>
      </div>
      <div class="about-skills">
        <h4>Development tools and languages:</h4>
        <div>
          <span v-for="skill in profile.skills" :key="skill.name">
            {{ skill }}<i>,</i></span
          >
        </div>
      </div>
      <div class="about-contacts">
        <h4>Contact Me</h4>
        <p>{{ profile.name }}</p>
        <p>{{ profile.phone }}</p>
        <p>
          <a
            :href="`mailto:${profile.email}`"
            target="_blank"
            rel="noopener noreferrer"
            >{{ profile.email }}</a
          >
        </p>
      </div>
      <div class="about-social">
        <a
          v-for="s in socials"
          :key="`${s.name}`"
          :href="`${s.url}`"
          target="_blank"
          :style="`color:${s.color};`"
          rel="noopener noreferrer"
          >{{ s.name }}<span>|</span></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      profiles: [
        {
          name: "Edgaras Neverdauskas",
          phone: "+855 816 80954",
          email: "contact@edgarasneverdauskas.com",
          skills: ["React", "Vue CLI", "GitHub", "Node.js", "WordPress", "HTML", "CSS", "JavaScript", "PHP", "ASP"]
        }
      ],
      socials: [
        {
          url: "https://github.com/Evirtual",
          name: "GitHub",
          color: "#000000"
        },
        {
          url: "https://www.linkedin.com/in/edgarasneverdauskas",
          name: "LinkedIn",
          color: "#007bb5"
        },
        {
          url: "https://www.facebook.com/edgaras.neverdauskas",
          name: "Facebook",
          color: "#3b5998"
        },
        {
          url: "https://www.pinterest.com/neveredgaras",
          name: "Pinterest",
          color: "#cb2027"
        },
        {
          url: "https://www.instagram.com/edgaras.neverdauskas",
          name: "Instagram",
          color: "#e4405f"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.about {
  margin-bottom: 20px;
  max-width: 620px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.85);
  color: black;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  font-size: 0.8em;
  @media only screen and (min-width: 768px) {
    font-size: 1em;
    margin-bottom: 0;
  }
  h3 {
    font-size: 2.5em;
    margin-top: 0;
  }
  h4 {
    font-size: 1.1em;
    margin-top: 30px;
    font-weight: 500;
  }
  p {
    font-size: 1.15em;
    line-height: 1.25;
  }
  .about-contacts {
    p {
      margin-top: 0;
      margin-bottom: 5px;
    }
    a {
      color: black;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .about-skills {
    span {
      display: inline-block;
      font-size: 1.15em;
      margin-right: 5px;
      &:last-child {
        i {
          display: none;
        }
      }
    }
  }
  .about-social {
    margin-top: 30px;
    a {
      font-weight: 400;
      display: inline-block;
      margin-bottom: 5px;
      margin-right: 10px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      span {
        margin-left: 10px;
        font-style: normal;
        color: black;
      }
      &:last-child {
        span {
          display: none;
        }
      }
    }
  }
}
</style>
