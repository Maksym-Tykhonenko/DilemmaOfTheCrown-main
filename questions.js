// questions.js

export const QUESTIONS = [
    {
      id: 1,
      category: 'War',
      year: 1306,
      title: "The General's Pride",
      scenario:
        "A trusted general wins a battle but disobeys your orders. His victory made you popular, but his arrogance grows. The court is divided—reward him, or punish his disobedience?",
      options: [
        { text: "Publicly strip his title to show command", popularity: 25 },
        {
          text: "Quietly reassign him to a distant post",
          popularity: 70,
          recommended: true,
        },
        { text: "Honor him in public, warn in private", popularity: 60 },
        { text: "Promote him to keep him loyal", popularity: 35 },
      ],
      canonicalOutcome:
        "The king reassigned him far from the capital to reduce his influence.",
    },
    {
      id: 2,
      category: 'War',
      year: 1152,
      title: 'The War Marriage Pact',
      scenario:
        "You can end a long war by marrying your daughter to the enemy prince. The people oppose this union. The prince is respectful, but your daughter despises him.",
      options: [
        { text: "Proceed with the marriage", popularity: 80, recommended: true },
        { text: "Refuse and continue the war", popularity: 20 },
        { text: "Seek another political alliance", popularity: 55 },
        { text: "Let your daughter decide", popularity: 10 },
      ],
      canonicalOutcome:
        "The king forced the marriage, ending the war and expanding influence.",
    },
    {
      id: 3,
      category: 'War',
      year: 1384,
      title: 'The Mercenary Betrayal',
      scenario:
        "Mercenaries you hired switched sides mid-battle, but now beg forgiveness and offer to fight for you again—for double the gold.",
      options: [
        { text: "Execute their leaders as traitors", popularity: 30 },
        {
          text: "Rehire them under strict oversight",
          popularity: 60,
          recommended: true,
        },
        { text: "Use them as bait against the enemy", popularity: 20 },
        { text: "Imprison them indefinitely", popularity: 10 },
      ],
      canonicalOutcome:
        "The king rehired them under oath and watched them closely. They later helped win a decisive battle.",
    },
    {
      id: 4,
      category: 'War',
      year: 1105,
      title: 'The Burning Bridge',
      scenario:
        "Retreating forces suggest burning the main bridge to slow the enemy. But refugees are still fleeing across it.",
      options: [
        { text: "Burn the bridge now, sacrifice the civilians", popularity: 15 },
        {
          text: "Wait until the last moment",
          popularity: 65,
          recommended: true,
        },
        { text: "Keep the bridge intact and fight at the river", popularity: 45 },
        { text: "Use another route entirely", popularity: 25 },
      ],
      canonicalOutcome:
        "The king delayed until the final moment, saving civilians and escaping barely in time.",
    },
  
    {
      id: 5,
      category: 'Love',
      year: 1483,
      title: 'The Banned Romance',
      scenario:
        "Your heir falls in love with a merchant’s daughter. Nobility is outraged. He refuses to marry anyone else.",
      options: [
        { text: "Forbid the marriage and threaten exile", popularity: 15 },
        { text: "Allow it for love's sake", popularity: 30 },
        {
          text: "Force a political marriage and keep the girl as mistress",
          popularity: 65,
          recommended: true,
        },
        { text: "Disown the heir and name another", popularity: 5 },
      ],
      canonicalOutcome:
        "The heir married a noblewoman but kept the romance in secret with the king’s knowledge.",
    },
    {
      id: 6,
      category: 'Love',
      year: 1391,
      title: 'The Poisoned Lover',
      scenario:
        "Your secret lover dies suddenly. Rumors say your rival poisoned them. No proof exists, and accusing him may cause civil unrest.",
      options: [
        { text: "Publicly accuse and arrest the rival", popularity: 20 },
        { text: "Order a silent assassination in return", popularity: 75, recommended: true },
        { text: "Do nothing", popularity: 5 },
        { text: "Secretly investigate and leak information", popularity: 55 },
      ],
      canonicalOutcome:
        "The king ordered the quiet execution of the suspected rival through intermediaries.",
    },
    {
      id: 7,
      category: 'Love',
      year: 1189,
      title: 'The Forbidden Queen',
      scenario:
        "You fell in love with a former queen of a rival kingdom, now exiled. Marrying her could reignite conflict, but the alliance could also stabilize the region.",
      options: [
        { text: "Marry her and risk public outrage", popularity: 35 },
        { text: "Keep the relationship secret", popularity: 45 },
        { text: "Use her as a diplomatic hostage", popularity: 10 },
        { text: "Publicly marry her to provoke unity", popularity: 60, recommended: true },
      ],
      canonicalOutcome:
        "The ruler shocked the court with a public marriage, which ultimately united the people against a shared foreign threat.",
    },
    {
      id: 8,
      category: 'Love',
      year: 1332,
      title: "The Knight's Oath",
      scenario:
        "A knight saves your life in battle. Later, he confesses to being secretly in love with your spouse.",
      options: [
        { text: "Strip him of his title and exile him", popularity: 20 },
        { text: "Have him executed for disloyalty", popularity: 10 },
        {
          text: "Allow him to continue serving in silence",
          popularity: 70,
          recommended: true,
        },
        { text: "Send him to war and hope he doesn’t return", popularity: 40 },
      ],
      canonicalOutcome:
        "The king kept the knight in service, using his loyalty and controlling the situation discreetly.",
    },
  
    {
      id: 9,
      category: 'Power',
      year: 1511,
      title: 'The Dying Advisor',
      scenario:
        "Your dying advisor holds secrets that could destroy your enemies. His son offers the secrets—in exchange for his father’s place in your council.",
      options: [
        {
          text: "Accept the deal, name the son as advisor",
          popularity: 60,
          recommended: true,
        },
        { text: "Take the secrets, then banish the son", popularity: 25 },
        { text: "Reject the deal", popularity: 10 },
        { text: "Force the son into service without title", popularity: 45 },
      ],
      canonicalOutcome:
        "The king granted the son the title to preserve the alliance.",
    },
    {
      id: 10,
      category: 'Power',
      year: 1024,
      title: 'The Royal Twin',
      scenario:
        "Your twin brother helped you gain the throne. Now, he is too popular and whispers rise that he should rule instead.",
      options: [
        { text: "Exile him quietly to distant lands", popularity: 40 },
        {
          text: "Name him military leader to distract him",
          popularity: 65,
          recommended: true,
        },
        { text: "Execute him to stop rumors", popularity: 10 },
        { text: "Let him co-rule", popularity: 15 },
      ],
      canonicalOutcome:
        "He was given command of distant military campaigns and slowly faded from court influence.",
    },
    {
      id: 11,
      category: 'Power',
      year: 1042,
      title: 'The Cursed Crown',
      scenario:
        "A sacred crown believed to be cursed has returned to your family. Some demand it be buried, others say wearing it will prove your divine right.",
      options: [
        { text: "Destroy it in public", popularity: 10 },
        { text: "Lock it in the royal vault", popularity: 35 },
        { text: "Wear it at your next coronation", popularity: 65, recommended: true },
        { text: "Gift it to the Church", popularity: 30 },
      ],
      canonicalOutcome:
        "The ruler wore the crown in a public ceremony, claiming it brought strength through fear.",
    },
    {
      id: 12,
      category: 'Power',
      year: 1509,
      title: "The Council's Vote",
      scenario:
        "Your council voted against your plan for expansion. You have the legal power to override them, but doing so may divide the realm.",
      options: [
        { text: "Override and push forward", popularity: 55, recommended: true },
        { text: "Delay the vote and seek support", popularity: 45 },
        { text: "Remove key council members", popularity: 25 },
        { text: "Abandon the plan", popularity: 10 },
      ],
      canonicalOutcome:
        "The king pushed forward using royal authority, later justifying it with economic success.",
    },
  
    {
      id: 13,
      category: 'Faith',
      year: 1349,
      title: 'The Forbidden Relic',
      scenario:
        "A holy relic has been found on your land. The Church demands it be handed over, but your scholars believe it's a fake—and your people revere it.",
      options: [
        { text: "Give it to the Church to avoid scandal", popularity: 30 },
        { text: "Keep it and build a shrine around it", popularity: 70, recommended: true },
        { text: "Quietly return it without announcement", popularity: 55 },
        { text: "Publicly denounce it as false", popularity: 10 },
      ],
      canonicalOutcome:
        "The king kept the relic, using it to boost local faith and loyalty.",
    },
    {
      id: 14,
      category: 'Faith',
      year: 1227,
      title: 'The Heretic Monk',
      scenario:
        "A monk begins preaching a new doctrine that gains followers. The Church demands his arrest, but the people see him as a prophet.",
      options: [
        { text: "Arrest and execute him", popularity: 35 },
        { text: "Protect him to gain the people's love", popularity: 65, recommended: true },
        { text: "Send him away under disguise", popularity: 45 },
        { text: "Secretly poison him", popularity: 20 },
      ],
      canonicalOutcome:
        "The ruler protected him for a while, using his popularity for political gain, before allowing the Church to exile him later.",
    },
    {
      id: 15,
      category: 'Faith',
      year: 1090,
      title: "The Oracle’s Child",
      scenario:
        "A baby is born with a mark prophesied to “shake the throne.” Some see it as divine. Others want the child removed quietly.",
      options: [
        { text: "Adopt the child into the royal house", popularity: 30 },
        { text: "Hand them to the Church for guidance", popularity: 60, recommended: true },
        { text: "Exile the family to a distant land", popularity: 25 },
        { text: "Order the child’s quiet death", popularity: 5 },
      ],
      canonicalOutcome:
        "The child was raised in a monastery under royal watch, later becoming a famed prophet.",
    },
    {
      id: 16,
      category: 'Faith',
      year: 1401,
      title: 'The Star Omen',
      scenario:
        "A comet lights the sky. Priests say it's a bad omen and demand you halt all major actions, including your coronation.",
      options: [
        { text: "Postpone the coronation", popularity: 20 },
        { text: "Proceed, ignoring superstition", popularity: 65, recommended: true },
        { text: "Hold a mass prayer before continuing", popularity: 50 },
        { text: "Declare the comet a divine blessing", popularity: 40 },
      ],
      canonicalOutcome:
        "The king declared the comet a sign of change and was crowned during its passing, securing symbolic strength.",
    },
  
    {
      id: 17,
      category: 'Treason',
      year: 1499,
      title: "The Traitor’s Daughter",
      scenario:
        "A noble rebelled and was executed. His daughter is known for her loyalty and intelligence. Some want her executed too—others suggest using her as a political ally.",
      options: [
        { text: "Marry her into another kingdom", popularity: 60, recommended: true },
        { text: "Force her into the clergy", popularity: 35 },
        { text: "Execute her", popularity: 5 },
        { text: "Make her your advisor", popularity: 25 },
      ],
      canonicalOutcome:
        "She was married off to secure peace with a neighboring ally.",
    },
    {
      id: 18,
      category: 'Treason',
      year: 1445,
      title: "The Assassin's Confession",
      scenario:
        "A captured assassin admits to being sent by your own cousin. The cousin is powerful and beloved by the people. Exposing him could lead to civil war.",
      options: [
        { text: "Confront and banish the cousin", popularity: 40 },
        { text: "Secretly assassinate him in return", popularity: 75, recommended: true },
        { text: "Announce the plot and risk civil war", popularity: 20 },
        { text: "Pretend to forgive and watch him closely", popularity: 55 },
      ],
      canonicalOutcome:
        "The cousin mysteriously died two months later. The assassin vanished from the dungeons.",
    },
    {
      id: 19,
      category: 'Treason',
      year: 1457,
      title: 'The Spy Among Us',
      scenario:
        "A noble confesses that your chief advisor has been leaking secrets for years. No direct proof exists. If you're wrong, you'll lose a valuable ally.",
      options: [
        { text: "Secretly test the advisor’s loyalty", popularity: 60, recommended: true },
        { text: "Dismiss the advisor immediately", popularity: 25 },
        { text: "Confront them publicly", popularity: 15 },
        { text: "Have them quietly watched", popularity: 45 },
      ],
      canonicalOutcome:
        "The ruler ran a fake campaign leak to confirm the betrayal, then dismissed the advisor quietly.",
    },
    {
      id: 20,
      category: 'Treason',
      year: 1194,
      title: 'The Royal Masquerade Plot',
      scenario:
        "Whispers tell of an assassination attempt during the upcoming masquerade ball. Canceling the event could signal fear.",
      options: [
        { text: "Cancel the ball", popularity: 10 },
        { text: "Proceed with high security", popularity: 65, recommended: true },
        { text: "Use a body double", popularity: 50 },
        { text: "Attend in disguise and hunt the plotters", popularity: 40 },
      ],
      canonicalOutcome:
        "The king attended in full view, under tight security. The assassin was caught before acting.",
    },
  ];
  

  export default QUESTIONS;
  