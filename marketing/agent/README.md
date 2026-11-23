# DigiDog marketing agent: feedback loop

The marketing agent (skill `digidog-marketing-manager`) reads and writes these files.

| File | What it holds | Who writes |
|---|---|---|
| `feedback.md` | Erik's corrections, one line each | agent, after every task where Erik corrected something |
| `scorecard.md` | one row per finished task: edits needed, errors, rough effort | agent, at the end of every task |
| `benchmarks.md` | real past tasks with the "good result" criteria | agent proposes, Erik approves |
| `changelog.md` | every change to the skill and why | weekly review |

Weekly review (scheduled, Monday): read feedback + scorecard → propose skill edits → Erik approves → re-run the benchmarks dry → note results in changelog.
